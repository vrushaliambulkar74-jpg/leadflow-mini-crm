import { Router } from 'express';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import Lead, { LEAD_SOURCES, LEAD_STATUSES } from '../models/Lead.js';
import auth from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
router.use(auth);
const validate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json({ message: 'Please correct the highlighted fields.', errors: result.array().map(e => ({ field: e.path, message: e.msg })) });
  next();
};
const leadRules = [
  body('fullName').trim().isLength({ min: 2, max: 100 }).withMessage('Full name must be at least 2 characters.'),
  body('email').trim().isEmail().withMessage('Enter a valid email address.'),
  body('phone').trim().custom(v => String(v).replace(/\D/g, '').length >= 8).withMessage('Phone number must contain at least 8 digits.'),
  body('company').trim().isLength({ min: 2, max: 120 }).withMessage('Company name must be at least 2 characters.'),
  body('source').isIn(LEAD_SOURCES).withMessage('Select a valid lead source.'),
  body('status').isIn(LEAD_STATUSES).withMessage('Select a valid lead status.'),
  body('notes').optional({ nullable: true }).isLength({ max: 2000 }).withMessage('Notes cannot exceed 2000 characters.')
];
const cleanPayload = (body) => ({
  fullName: body.fullName, email: body.email, phone: body.phone, company: body.company,
  source: body.source, status: body.status, notes: body.notes || '', dealValue: body.dealValue || ''
});

router.get('/', asyncHandler(async (req, res) => {
  const { q = '', status = 'All', source = 'All', sort = 'newest' } = req.query;
  const filter = { owner: req.user._id };
  if (status !== 'All' && LEAD_STATUSES.includes(status)) filter.status = status;
  if (source !== 'All' && LEAD_SOURCES.includes(source)) filter.source = source;
  if (q.trim()) {
    const escaped = q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.$or = ['fullName', 'email', 'company', 'phone'].map(field => ({ [field]: { $regex: escaped, $options: 'i' } }));
  }
  const sortBy = sort === 'oldest' ? { createdDate: 1 } : sort === 'name' ? { fullName: 1 } : { createdDate: -1 };
  const leads = await Lead.find(filter).sort(sortBy).lean();
  res.json({ leads, total: leads.length });
}));
router.post('/', leadRules, validate, asyncHandler(async (req, res) => {
  const lead = await Lead.create({ ...cleanPayload(req.body), owner: req.user._id });
  res.status(201).json({ message: 'Lead created successfully.', lead });
}));
router.get('/:id', asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid lead ID.' });
  const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });
  if (!lead) return res.status(404).json({ message: 'Lead not found.' });
  res.json({ lead });
}));
router.put('/:id', leadRules, validate, asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid lead ID.' });
  const lead = await Lead.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, cleanPayload(req.body), { new: true, runValidators: true });
  if (!lead) return res.status(404).json({ message: 'Lead not found.' });
  res.json({ message: 'Lead updated successfully.', lead });
}));
router.delete('/:id', asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid lead ID.' });
  const lead = await Lead.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!lead) return res.status(404).json({ message: 'Lead not found.' });
  res.json({ message: 'Lead deleted successfully.' });
}));
export default router;
