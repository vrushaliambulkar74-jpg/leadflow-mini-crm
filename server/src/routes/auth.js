import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
const issueToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const safeUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role });
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: 'Please correct the highlighted fields.', errors: errors.array() });
  next();
};

router.post('/register',
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be at least 2 characters.'),
  body('email').trim().isEmail().withMessage('Enter a valid email.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  body('role').optional().isIn(['Admin', 'Sales Manager', 'Growth Lead', 'Account Executive']),
  validate,
  asyncHandler(async (req, res) => {
    const email = req.body.email.toLowerCase().trim();
    if (await User.findOne({ email })) return res.status(409).json({ message: 'An account with this email already exists.' });
    const user = await User.create({ name: req.body.name, email, password: await bcrypt.hash(req.body.password, 12), role: req.body.role || 'Sales Manager' });
    res.status(201).json({ token: issueToken(user), user: safeUser(user) });
  })
);

router.post('/login',
  body('email').trim().isEmail().withMessage('Enter a valid email.'),
  body('password').notEmpty().withMessage('Password is required.'),
  validate,
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase().trim() }).select('+password');
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) return res.status(401).json({ message: 'Email or password is incorrect.' });
    res.json({ token: issueToken(user), user: safeUser(user) });
  })
);
router.get('/me', auth, (req, res) => res.json({ user: safeUser(req.user) }));
export default router;
