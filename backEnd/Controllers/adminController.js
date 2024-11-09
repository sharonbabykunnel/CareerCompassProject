import asyncHandler from 'express-async-handler'
import Admin from './../repository/adminRepository.js'
import User from './../repository/userRepository.js'
import Post from './../repository/postRepository.js'
import AdminService from './../service/adminService.js';


const googleLogin = asyncHandler(async (req, res) => {
    try {
        const { displayName, email, uid, photoURL, emailVerified } = req.body;
        let user = await Admin.findByUid(uid)
        if (!user) {
            user = await Admin.createAdmin({ name: displayName, email, uid, photoURL, emailVerified, password:uid });
        }
        res.status(200).json({ message: "Succesfull" });
    } catch (error) {
        throw error
    }
})

const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Admin.findByEmail(email);
        if (!user) {
            user = await Admin.createAdmin({email, password});
        }
        res.status(200).json({ message: "Successful" });
    } catch (error) {
        throw error
    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const { current } = req.params;
      const users = await AdminService.getAllUsers(current);
      res.status(200).json({ users });
  } catch (error) {
    throw error;
  }
});

const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const { current } = req.params;
        const posts = await AdminService.getAllPost(current);
        res.status(200).json({ posts })
    } catch (error) {
        throw error
    }
});

const logout = asyncHandler(async (req, res) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
            sameSite:'strict'
        })
        res.status(200).json({ message: 'Logged Out Succesfully' });
    } catch (error) {
        throw error
    }
})

const getUser = asyncHandler(async (req, res) => {
    try {
        const { uid } = req.params;
        const response = await User.findByUid(uid)
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const getChartData = asyncHandler(async (req, res) => {
    try {
        const response = await AdminService.getChartData();
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const getAssociated = asyncHandler(async (req, res) => {
    try {
        const { user } = req.params;
        const response = await AdminService.getAssociated(user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const blockUser = asyncHandler(async (req, res) => {
    try {
        const { user } = req.params;
        const response = await AdminService.blockUser(user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const unblockUser = asyncHandler(async (req, res) => {
    try {
        const { user } = req.params;
        const response = await AdminService.unblockUser(user);
        res.status(200).json(response);
    } catch (error) {
        throw error
    }
})

const blockPost = asyncHandler(async (req, res) => {
  try {
    const { uid } = req.params;
    const response = await AdminService.blockPost(uid);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const unblockPost = asyncHandler(async (req, res) => {
  try {
    const { uid } = req.params;
    const response = await AdminService.unblockPost(uid);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const getPostDetails = asyncHandler(async (req, res) => {
  try {
    const { uid } = req.params;
    const response = await AdminService.getPostDetails(uid);
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const getPostChartData = asyncHandler(async (req, res) => {
  try {
      const response = await AdminService.getPostChartData();
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

const getJobChartData = asyncHandler(async (req, res) => {
  try {
      const response = await AdminService.getJobChartData();
    res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

export default {
  googleLogin,
  login,
  getAllUsers,
  getAllPosts,
  logout,
  getUser,
  getChartData,
  getAssociated,
  blockUser,
  unblockUser,
  blockPost,
  unblockPost,
  getPostDetails,
  getPostChartData,
  getJobChartData,
};