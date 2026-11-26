import mongoose from 'mongoose';
export const LEAD_STATUSES = ['New', 'Contacted', 'Interested', 'Converted', 'Lost'];
export const LEAD_SOURCES = ['Website', 'LinkedIn', 'Referral', 'Cold Outreach', 'Event'];
const leadSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  company: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
  source: { type: String, enum: LEAD_SOURCES, required: true },
  status: { type: String, enum: LEAD_STATUSES, default: 'New', required: true },
  createdDate: { type: Date, default: Date.now },
  notes: { type: String, trim: true, maxlength: 2000, default: '' },
  dealValue: { type: String, trim: true, maxlength: 80, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
leadSchema.index({ fullName: 'text', email: 'text', company: 'text', phone: 'text' });
export default mongoose.model('Lead', leadSchema);
