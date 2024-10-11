import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateAccessAndRefreshTokens = async (userId) => {
  try {
    
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      200,
      "Something went wrong while generating Access and Refresh Token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  console.log(req.body)

  if ([userName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });
  

  if (existedUser) {
       throw new ApiError(200, "User with this email already exists!!")
  }

  const user = await User.create({
    userName,
    email,
    password,
   
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(200, "Some Error Occured while registering the User");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully!!!"));
});



const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not found!!");
    
  }

  const isPasswordValid = await user.generateAuthToken(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Wrong Password! Try Again!!");
    
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
  const loggedInUser = await User.findById(user._id)
  const options = {
    httpOnly: true,
    secure : false
}

res
.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(new ApiResponse(200, 
  {
    user: loggedInUser, accessToken,
    refreshToken
}
, "User logged in successfully"))


});


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
  
    if (!users || users.length === 0) {
      throw new ApiError(404, "No users found");
    }
  
    res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully"));
  });

  const updateUserDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userName, email } = req.body;
  
    if ([userName, email].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Username and Email are required");
    }
  
    const user = await User.findById(id);
  
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    // Check if the email is already used by another user
    const emailExists = await User.findOne({ email, _id: { $ne: id } });
    if (emailExists) {
      throw new ApiError(400, "Email is already taken by another user");
    }
  
    user.userName = userName;
    user.email = email;
  
    const updatedUser = await user.save();
  
    const sanitizedUser = await User.findById(updatedUser._id).select("-password");
  
    res.status(200).json(new ApiResponse(200, sanitizedUser, "User updated successfully"));
  });
  


  const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const user = await User.findById(id);
  
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    await User.findByIdAndDelete(id);
  
    res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
  });
  
  








export { registerUser, loginUser, getAllUsers,updateUserDetails, deleteUser};
