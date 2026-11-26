import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Lead from '../models/Lead.js';

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  let user = await User.findOne({ email: 'pranav@leadflow.io' });
  if (!user) user = await User.create({ name: 'Pranav', email: 'pranav@leadflow.io', password: await bcrypt.hash('Admin@2026', 12), role: 'Admin' });
  const samples = [
    ['Aarav Deshmukh','aarav.deshmukh@nexustech.in','+91 98230 45120','NexusCloud Solutions','LinkedIn','Converted','2026-11-12','Signed annual enterprise license for 50 seats.','$18,000 - $25,000'],
    ['Ananya Iyer','a.iyer@finbridge.co.in','+91 98450 77812','FinBridge Analytics','Website','Interested','2026-11-16','Requested custom API integration demo.','$14,000 - $22,000'],
    ['Rohan Kulkarni','rohan@vidarbhatech.io','+91 97654 32109','Vidarbha Logistics','Referral','Contacted','2026-11-18','Discovery call completed; reviewing proposal.','$12,000 - $19,000'],
    ['Meera Nair','meera.nair@keraladigital.in','+91 94471 88920','Malabar Commerce','Event','New','2026-11-22','Met at SaaS Founders Summit.','$15,000 - $24,000'],
    ['Vikramaditya Joshi','v.joshi@punedynamics.com','+91 99220 11456','Pune AutoDynamics','Cold Outreach','Contacted','2026-11-23','Follow-up scheduled with VP of Operations.','$20,000 - $30,000'],
    ['Siddharth Malhotra','siddharth@delhifintech.in','+91 98111 65432','CapitalPay Tech','LinkedIn','Converted','2026-11-10','Onboarding completed.','$25,000 - $35,000'],
    ['Kavita Reddy','kavita@hyderabadbiotech.org','+91 98490 23451','Deccan BioLabs','Website','Lost','2026-11-08','Deferred procurement until next fiscal cycle.','$10,000 - $15,000'],
    ['Pranav Chatterjee','pranav@bengalsoft.in','+91 98300 99811','EastCoast DataWorks','Referral','New','2026-11-25','Inbound inquiry via partner network.','$16,000 - $21,000']
  ];
  for (const [fullName,email,phone,company,source,status,createdDate,notes,dealValue] of samples) {
    await Lead.updateOne({ owner: user._id, email }, { $setOnInsert: { fullName,email,phone,company,source,status,createdDate:new Date(createdDate),notes,dealValue,owner:user._id } }, { upsert:true });
  }
  console.log('Seed complete. Demo login: pranav@leadflow.io / Admin@2026');
  await mongoose.disconnect();
};
run().catch(err => { console.error(err); process.exit(1); });
