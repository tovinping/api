import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  // 用于密码加密
import crypto from 'crypto';  // 用于生成密码重置令牌

const userSchema = new mongoose.Schema({
  // 基本信息
  username: {
    type: String,
    required: [true, '请输入用户名'],
    unique: true,
    trim: true,
    minLength: [3, '用户名至少3个字符'],
    maxLength: [20, '用户名最多20个字符']
  },
  // 邮箱
  email: {
    type: String,
    required: [true, '请输入邮箱'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '请输入有效的邮箱地址']
  },
  // 密码
  password: {
    type: String,
    required: [true, '请输入密码'],
    minLength: [6, '密码至少6个字符'],
    select: false  // 查询时默认不返回密码字段
  },
  
  // 个人资料
  name: {
    type: String,
    trim: true
  },
  // 头像
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  // 个人简介
  bio: {
    type: String,
    maxLength: [200, '个人简介最多200个字符']
  },
  // 电话
  phone: String,
  
  // 用户状态
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  // 角色
  role: {
    type: String,
    enum: ['user', 'admin', 'superAdmin'],
    default: 'user'
  },
  
  // 账户安全
  lastLoginAt: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // 时间戳
  createdAt: {
    type: Date,
    default: Date.now
  },
  // 更新时间
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,  // 自动管理 createdAt 和 updatedAt
  versionKey: false  // 禁用 __v 版本键
});

// 索引
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// 密码加密中间件
userSchema.pre('save', async function(next) {
  // 只有在密码被修改时才重新加密
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// 实例方法：验证密码
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 实例方法：生成密码重置令牌
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10分钟后过期
  
  return resetToken;
};


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 