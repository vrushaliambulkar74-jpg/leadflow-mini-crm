
import React, { useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard, Users, UserPlus, BarChart3, FileCode2, LogOut, Search, Bell,
  Menu, X, CalendarDays, BriefcaseBusiness, Mail, Phone, Building2, Pencil,
  Trash2, Plus, ArrowUpRight, ArrowDownRight, ChevronDown, Filter, RefreshCw,
  Sparkles, ShieldCheck, LockKeyhole, Eye, EyeOff, CircleHelp, MoreHorizontal,
  CheckCircle2, Clock3, TrendingUp, Download, SlidersHorizontal, Activity,
  CircleUserRound, ExternalLink
} from 'lucide-react';
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  BarChart, Bar, Cell
} from 'recharts';
import { authApi, leadsApi } from './api';

const STATUSES = ['New', 'Contacted', 'Interested', 'Converted', 'Lost'];
const SOURCES = ['Website', 'LinkedIn', 'Referral', 'Cold Outreach', 'Event'];
const initialForm = { fullName:'', email:'', phone:'', company:'', source:'Website', status:'New', notes:'', dealValue:'' };
const statusStyle = {
  New: 'bg-sky-50 text-sky-700 ring-sky-200',
  Contacted: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Interested: 'bg-violet-50 text-violet-700 ring-violet-200',
  Converted: 'bg-lime-50 text-lime-700 ring-lime-200',
  Lost: 'bg-rose-50 text-rose-700 ring-rose-200'
};
const initials = (name='') => name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase();
const dateLabel = (date) => date ? new Date(date).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—';
const errorText = (e) => e.response?.data?.message || 'Something went wrong. Please try again.';

function Brand({small=false}) {
  return <div className="flex items-center gap-3">
    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-xl font-extrabold text-brand shadow-lg shadow-black/10">L</div>
    {!small && <div><div className="text-[21px] font-extrabold tracking-tight text-white">LeadFlow</div><div className="-mt-1 text-[10px] font-semibold uppercase tracking-[.19em] text-violet-200">Mini CRM workspace</div></div>}
  </div>;
}

function Status({value}) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${statusStyle[value] || 'bg-slate-100 text-slate-600 ring-slate-200'}`}><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current"/>{value}</span>;
}

function AuthScreen({onAuth}) {
  const [mode,setMode] = useState('login');
  const [show,setShow] = useState(false);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [form,setForm] = useState({name:'',email:'pranav@leadflow.io',password:'Admin@2026',role:'Sales Manager'});
  const change = (k,v) => setForm(p=>({...p,[k]:v}));
  const submit = async (e) => {
    e.preventDefault(); setError(''); setBusy(true);
    try {
      const res = mode==='login'
        ? await authApi.login({email:form.email,password:form.password})
        : await authApi.register(form);
      onAuth(res.data);
    } catch(err) { setError(errorText(err)); }
    finally { setBusy(false); }
  };
  return <div className="flex min-h-screen items-center justify-center bg-[#f5f3fb] p-4 sm:p-8">
    <div className="grid w-full max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-2xl shadow-violet-950/10 lg:grid-cols-[.88fr_1.12fr]">
      <section className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-brand p-8 text-white sm:p-10">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[42px] border-white/5"/>
        <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-sky-400/10 blur-2xl"/>
        <div className="relative"><Brand/>
          <div className="mt-14 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-violet-100"><Sparkles size={14}/> A clearer sales pipeline</div>
          <h1 className="mt-5 max-w-sm text-4xl font-extrabold leading-[1.12] tracking-tight">Turn every conversation into an opportunity.</h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-violet-100/80">Keep your prospects organised, move deals forward and make follow-ups feel effortless.</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[['Pipeline','One clear view'],['Outreach','Every lead captured'],['Follow-ups','Never lose context'],['Insights','Decisions with data']].map(([a,b],i)=><div key={a} className="rounded-2xl border border-white/10 bg-white/[.08] p-3"><div className="text-[11px] text-violet-200">{a}</div><div className="mt-1 text-sm font-bold">{b}</div></div>)}
          </div>
        </div>
        <div className="relative mt-10 flex items-center justify-between border-t border-white/15 pt-5 text-xs text-violet-200"><span>LeadFlow Admin Portal · 2026</span><ShieldCheck size={19} className="text-emerald-300"/></div>
      </section>
      <section className="flex items-center p-7 sm:p-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex rounded-xl bg-slate-100 p-1">
            <button onClick={()=>{setMode('login');setError('')}} className={`flex-1 rounded-lg py-2.5 text-sm font-bold ${mode==='login'?'bg-white text-brand shadow-sm':'text-slate-500'}`}>Sign in</button>
            <button onClick={()=>{setMode('register');setError('')}} className={`flex-1 rounded-lg py-2.5 text-sm font-bold ${mode==='register'?'bg-white text-brand shadow-sm':'text-slate-500'}`}>Create account</button>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{mode==='login'?'Welcome back':'Create your workspace'}</h2>
          <p className="mt-2 text-sm text-slate-500">{mode==='login'?'Sign in to continue to your LeadFlow dashboard.':'A few details and your sales workspace is ready.'}</p>
          {error && <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode==='register' && <label className="block text-xs font-bold text-slate-600">FULL NAME<input className="field mt-2" required minLength="2" placeholder="Your name" value={form.name} onChange={e=>change('name',e.target.value)}/></label>}
            <label className="block text-xs font-bold text-slate-600">WORK EMAIL<input className="field mt-2" type="email" required placeholder="you@company.com" value={form.email} onChange={e=>change('email',e.target.value)}/></label>
            <label className="block text-xs font-bold text-slate-600">PASSWORD<div className="relative mt-2"><input className="field pr-12" type={show?'text':'password'} required minLength="6" placeholder="Enter your password" value={form.password} onChange={e=>change('password',e.target.value)}/><button type="button" onClick={()=>setShow(!show)} className="absolute right-4 top-3.5 text-slate-400">{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
            {mode==='register' && <label className="block text-xs font-bold text-slate-600">ROLE<select className="field mt-2" value={form.role} onChange={e=>change('role',e.target.value)}>{['Admin','Sales Manager','Growth Lead','Account Executive'].map(x=><option key={x}>{x}</option>)}</select></label>}
            <button disabled={busy} className="btn-primary mt-2 w-full py-3.5">{busy?'Please wait…':mode==='login'?'Sign in to dashboard':'Create account'} <ArrowUpRight size={17}/></button>
          </form>
          {mode==='login' && <div className="mt-5 rounded-xl border border-violet-100 bg-violet-50/70 p-4 text-xs text-violet-900"><div className="flex items-center gap-2 font-bold"><Sparkles size={14}/> Demo access</div><div className="mt-2 text-violet-700">pranav@leadflow.io</div><div className="font-semibold">Admin@2026</div><div className="mt-1 text-violet-600">Seed the database once to enable this account.</div></div>}
        </div>
      </section>
    </div>
  </div>;
}

function LeadModal({lead,onClose,onSave}) {
  const [form,setForm] = useState(lead?{...initialForm,...lead}:initialForm);
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);
  const update=(k,v)=>setForm(p=>({...p,[k]:v}));
  const submit=async(e)=>{e.preventDefault();setError('');setBusy(true);try{await onSave(form);onClose()}catch(err){setError(errorText(err))}finally{setBusy(false)}};
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-3 backdrop-blur-sm" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <div className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5"><div><div className="text-lg font-extrabold text-slate-900">{lead?'Edit lead':'Add a new lead'}</div><div className="mt-1 text-xs text-slate-500">Capture the details. Keep the relationship moving.</div></div><button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={19}/></button></div>
      <form onSubmit={submit} className="space-y-5 p-6">
        {error&&<div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-bold text-slate-600 sm:col-span-2">FULL NAME *<input className="field mt-2" required minLength="2" placeholder="e.g. Neha Sharma" value={form.fullName} onChange={e=>update('fullName',e.target.value)}/></label>
          <label className="text-xs font-bold text-slate-600">EMAIL ADDRESS *<input className="field mt-2" type="email" required placeholder="neha@company.in" value={form.email} onChange={e=>update('email',e.target.value)}/></label>
          <label className="text-xs font-bold text-slate-600">PHONE NUMBER *<input className="field mt-2" required placeholder="+91 98230 12345" value={form.phone} onChange={e=>update('phone',e.target.value)}/></label>
          <label className="text-xs font-bold text-slate-600">COMPANY NAME *<input className="field mt-2" required minLength="2" placeholder="Company name" value={form.company} onChange={e=>update('company',e.target.value)}/></label>
          <label className="text-xs font-bold text-slate-600">LEAD SOURCE<select className="field mt-2" value={form.source} onChange={e=>update('source',e.target.value)}>{SOURCES.map(s=><option key={s}>{s}</option>)}</select></label>
          <label className="text-xs font-bold text-slate-600">LEAD STATUS<select className="field mt-2" value={form.status} onChange={e=>update('status',e.target.value)}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
          <label className="text-xs font-bold text-slate-600">ESTIMATED DEAL VALUE<input className="field mt-2" placeholder="e.g. ₹1,50,000" value={form.dealValue||''} onChange={e=>update('dealValue',e.target.value)}/></label>
          <label className="text-xs font-bold text-slate-600 sm:col-span-2">NOTES / FOLLOW-UP CONTEXT<textarea className="field mt-2 min-h-24 resize-y" maxLength="2000" placeholder="Add discovery notes, next meeting date or requirements…" value={form.notes||''} onChange={e=>update('notes',e.target.value)}/></label>
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" className="btn-secondary" onClick={onClose}>Cancel</button><button disabled={busy} className="btn-primary"><CheckCircle2 size={16}/>{busy?'Saving…':lead?'Save changes':'Create lead'}</button></div>
      </form>
    </div>
  </div>;
}

function MetricCard({title,value,caption,icon:Icon,tint,trend}) {
  return <div className="panel p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
    <div className="flex items-start justify-between"><div><div className="text-sm font-semibold text-slate-500">{title}</div><div className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{value}</div></div><div className={`grid h-11 w-11 place-items-center rounded-2xl ${tint}`}><Icon size={20}/></div></div>
    <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500"><span className="inline-flex items-center gap-1 font-bold text-emerald-600"><ArrowUpRight size={13}/>{trend}</span>{caption}</div>
  </div>;
}

function LeadTable({leads,onEdit,onDelete,onStatus}) {
  if(!leads.length) return <div className="px-6 py-16 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-50 text-brand"><Users size={25}/></div><div className="mt-4 font-bold text-slate-800">No leads found</div><p className="mt-1 text-sm text-slate-500">Try changing your search or filters.</p></div>;
  return <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left"><thead><tr className="border-y border-slate-100 bg-slate-50/70 text-[10px] font-extrabold uppercase tracking-[.12em] text-slate-400"><th className="px-5 py-3">Lead / Company</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Source</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Created</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">
    {leads.map((lead,i)=><tr key={lead._id} className="transition hover:bg-violet-50/30">
      <td className="px-5 py-4"><div className="flex items-center gap-3"><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-extrabold ${['bg-sky-100 text-sky-700','bg-violet-100 text-violet-700','bg-emerald-100 text-emerald-700','bg-orange-100 text-orange-700'][i%4]}`}>{initials(lead.fullName)}</div><div><div className="text-sm font-bold text-slate-800">{lead.fullName}</div><div className="mt-0.5 text-xs text-slate-400">{lead.company}</div></div></div></td>
      <td className="px-4 py-4"><div className="text-xs font-medium text-slate-700">{lead.email}</div><div className="mt-1 text-xs text-slate-400">{lead.phone}</div></td>
      <td className="px-4 py-4"><span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">{lead.source}</span></td>
      <td className="px-4 py-4"><select aria-label={`Status for ${lead.fullName}`} value={lead.status} onChange={e=>onStatus(lead,e.target.value)} className={`max-w-[125px] cursor-pointer rounded-full border-0 py-1.5 pl-2.5 pr-7 text-[11px] font-bold ring-1 ring-inset focus:ring-2 focus:ring-brand ${statusStyle[lead.status]}`}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></td>
      <td className="px-4 py-4 text-xs font-medium text-slate-500">{dateLabel(lead.createdDate)}</td>
      <td className="px-4 py-4"><div className="flex justify-end gap-1"><button title="Edit lead" onClick={()=>onEdit(lead)} className="rounded-lg p-2 text-slate-400 hover:bg-violet-50 hover:text-brand"><Pencil size={15}/></button><button title="Delete lead" onClick={()=>onDelete(lead)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={15}/></button></div></td>
    </tr>)}
  </tbody></table></div>;
}

function PipelineChart({leads}) {
  const data = useMemo(()=> {
    const now = new Date();
    return Array.from({length:6},(_,i)=>{
      const month = new Date(now.getFullYear(),now.getMonth()-5+i,1);
      const label = month.toLocaleDateString('en-IN',{month:'short'});
      const group = leads.filter(l=>{const d=new Date(l.createdDate);return d.getMonth()===month.getMonth()&&d.getFullYear()===month.getFullYear()});
      return {month:label,leads:group.length,converted:group.filter(l=>l.status==='Converted').length};
    });
  },[leads]);
  return <div className="panel p-5 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-extrabold text-slate-900">Lead pipeline</h3><p className="mt-1 text-xs text-slate-400">New leads and conversions over the last six months</p></div><span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-brand">Last 6 months</span></div>
    <div className="mt-5 h-[240px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{top:8,right:8,left:-24,bottom:0}}><defs><linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6848C7" stopOpacity={.22}/><stop offset="100%" stopColor="#6848C7" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#EEF0F6" strokeDasharray="4 4" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:'#94A3B8',fontSize:11}}/><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill:'#94A3B8',fontSize:11}}/><Tooltip contentStyle={{border:'1px solid #eee',borderRadius:12,fontSize:12,boxShadow:'0 8px 25px #24144a12'}}/><Area type="monotone" dataKey="leads" name="Leads" stroke="#6848C7" strokeWidth={2.5} fill="url(#leadsFill)"/><Area type="monotone" dataKey="converted" name="Converted" stroke="#19B985" strokeWidth={2.5} fill="transparent"/></AreaChart></ResponsiveContainer></div>
    <div className="mt-2 flex justify-center gap-6 text-xs font-semibold text-slate-500"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#6848C7]"/>Leads</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#19B985]"/>Converted</span></div>
  </div>;
}

function SourceBreakdown({leads}) {
  const data=SOURCES.map(source=>({source,count:leads.filter(l=>l.source===source).length})).filter(x=>x.count);
  const colors=['#6848C7','#4AA7F2','#19B985','#F59E0B','#E879A8'];
  return <div className="panel p-5 sm:p-6"><h3 className="font-extrabold text-slate-900">Lead sources</h3><p className="mt-1 text-xs text-slate-400">Where your prospects come from</p>
    {data.length?<div className="mt-5 space-y-4">{data.map((d,i)=><div key={d.source}><div className="mb-2 flex justify-between text-xs"><span className="font-semibold text-slate-600">{d.source}</span><span className="font-bold text-slate-800">{d.count}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{width:`${leads.length?d.count/leads.length*100:0}%`,background:colors[i%colors.length]}}/></div></div>)}</div>:<div className="py-12 text-center text-sm text-slate-400">Add leads to see source insights.</div>}
  </div>;
}

function ApiDocs() {
  const rows=[['POST','/api/auth/register','Create a user account'],['POST','/api/auth/login','Authenticate and receive JWT'],['GET','/api/auth/me','Get current signed-in user'],['GET','/api/leads','List leads with search and filters'],['POST','/api/leads','Create a lead'],['GET','/api/leads/:id','Get a single lead'],['PUT','/api/leads/:id','Update lead details or status'],['DELETE','/api/leads/:id','Delete a lead']];
  return <div className="space-y-5"><div className="panel p-6"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-50 text-brand"><FileCode2/></div><div><h2 className="font-extrabold text-slate-900">REST API reference</h2><p className="text-xs text-slate-500">Express endpoints used by this application</p></div></div><div className="mt-6 divide-y divide-slate-100">{rows.map(([method,path,desc])=><div key={path+method} className="flex flex-wrap items-center justify-between gap-3 py-3"><div className="flex items-center gap-3"><span className={`w-16 rounded-lg px-2 py-1 text-center text-[10px] font-extrabold ${method==='GET'?'bg-emerald-50 text-emerald-700':method==='POST'?'bg-sky-50 text-sky-700':method==='PUT'?'bg-amber-50 text-amber-700':'bg-rose-50 text-rose-700'}`}>{method}</span><code className="text-xs font-bold text-slate-800">{path}</code></div><span className="text-xs text-slate-400">{desc}</span></div>)}</div></div><div className="panel p-6"><h3 className="font-extrabold text-slate-900">Lead data model</h3><pre className="mt-4 overflow-x-auto rounded-2xl bg-[#11152A] p-5 text-xs leading-6 text-cyan-200">{`{
  "fullName": "Aarav Deshmukh",
  "email": "aarav@example.com",
  "phone": "+91 98230 45120",
  "company": "NexusCloud Solutions",
  "source": "LinkedIn",
  "status": "Contacted",
  "createdDate": "2026-11-26T00:00:00.000Z",
  "notes": "Discovery call completed"
}`}</pre></div></div>;
}

export default function App() {
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('leadflow_user'))}catch{return null}});
  const [page,setPage]=useState('dashboard');
  const [leads,setLeads]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
 const [query,setQuery]=useState('');
const [topQuery,setTopQuery]=useState('');
  const [status,setStatus]=useState('All');
  const [source,setSource]=useState('All');
  const [sort,setSort]=useState('newest');
  const [modal,setModal]=useState(null);
  const [deleteTarget,setDeleteTarget]=useState(null);
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [toast,setToast]=useState('');
  const [toastTimer,setToastTimer]=useState(null);

  const notify=(message)=>{setToast(message);if(toastTimer)clearTimeout(toastTimer);const timer=setTimeout(()=>setToast(''),3000);setToastTimer(timer)};
  const loadLeads=async()=>{if(!user)return;setLoading(true);setError('');try{const res=await leadsApi.list({q:query,status,source,sort});setLeads(res.data.leads)}catch(e){setError(errorText(e))}finally{setLoading(false)}};
  useEffect(()=>{loadLeads()},[user,query,status,source,sort]);
  useEffect(()=>{const logout=()=>{setUser(null);setLeads([])};window.addEventListener('leadflow:unauthorized',logout);return()=>window.removeEventListener('leadflow:unauthorized',logout)},[]);
  const metrics=useMemo(()=>({total:leads.length,newLeads:leads.filter(l=>l.status==='New').length,contacted:leads.filter(l=>l.status==='Contacted').length,converted:leads.filter(l=>l.status==='Converted').length,interested:leads.filter(l=>l.status==='Interested').length,lost:leads.filter(l=>l.status==='Lost').length}),[leads]);
  const authenticate=(data)=>{localStorage.setItem('leadflow_token',data.token);localStorage.setItem('leadflow_user',JSON.stringify(data.user));setUser(data.user);notify('Welcome to LeadFlow')};
  const logout=()=>{localStorage.removeItem('leadflow_token');localStorage.removeItem('leadflow_user');setUser(null);setPage('dashboard')};
  const saveLead=async(form)=>{if(modal?.lead){const res=await leadsApi.update(modal.lead._id,form);setLeads(p=>p.map(l=>l._id===modal.lead._id?res.data.lead:l));notify('Lead updated successfully')}else{const res=await leadsApi.create(form);setLeads(p=>[res.data.lead,...p]);notify('New lead added');setPage('leads')}};
  const changeStatus=async(lead,newStatus)=>{try{const res=await leadsApi.update(lead._id,{...lead,status:newStatus});setLeads(p=>p.map(l=>l._id===lead._id?res.data.lead:l));notify(`${lead.fullName} moved to ${newStatus}`)}catch(e){notify(errorText(e))}};
  const removeLead=async()=>{try{await leadsApi.remove(deleteTarget._id);setLeads(p=>p.filter(l=>l._id!==deleteTarget._id));notify('Lead deleted');setDeleteTarget(null)}catch(e){notify(errorText(e))}};
  const nav=[['dashboard','Dashboard',LayoutDashboard],['leads','All Leads',Users],['add','Add New Lead',UserPlus],['analytics','Analytics',BarChart3],['docs','API & Docs',FileCode2]];
  const titles={dashboard:'Dashboard',leads:'All Leads',add:'Add New Lead',analytics:'Analytics',docs:'API & Docs'};
  if(!user)return <AuthScreen onAuth={authenticate}/>;
  const recent=[...leads].sort((a,b)=>new Date(b.createdDate)-new Date(a.createdDate)).slice(0,5);
  const filtered=leads; // The API applies search, filters and sorting.
  const openAdd=()=>setModal({lead:null});

  return <div className="min-h-screen bg-brand lg:flex">
    {sidebarOpen&&<button aria-label="Close navigation" className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={()=>setSidebarOpen(false)}/>}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[258px] flex-col bg-brand text-white transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen?'translate-x-0':'-translate-x-full'}`}>
      <div className="flex h-[88px] items-center justify-between px-7"><Brand/><button onClick={()=>setSidebarOpen(false)} className="lg:hidden"><X/></button></div>
      <div className="sidebar-scroll flex-1 overflow-y-auto px-4 pt-5">
        <div className="mb-3 px-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-violet-300">Workspace</div>
        <nav className="space-y-1.5">{nav.map(([id,label,Icon])=><button key={id} onClick={()=>{setPage(id);setSidebarOpen(false)}} className={`group relative flex w-full items-center gap-3.5 rounded-xl px-4 py-3.5 text-left text-sm transition ${page===id?'bg-white font-bold text-brand shadow-lg shadow-black/10':'font-medium text-violet-100/80 hover:bg-white/10 hover:text-white'}`}><Icon size={19} strokeWidth={page===id?2.4:1.8}/>{label}{id==='add'&&<Plus size={15} className="ml-auto opacity-70"/>}</button>)}</nav>
        <div className="mb-3 mt-9 px-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-violet-300">Account</div>
        <button onClick={logout} className="flex w-full items-center gap-3.5 rounded-xl px-4 py-3.5 text-sm font-medium text-violet-100/80 transition hover:bg-white/10 hover:text-white"><LogOut size={19}/>Sign out</button>
      </div>
      <div className="m-4 rounded-2xl border border-white/10 bg-white/[.08] p-4"><div className="flex items-center gap-2 text-xs font-bold"><ShieldCheck size={15} className="text-emerald-300"/>Your workspace is secure</div><p className="mt-2 text-[11px] leading-5 text-violet-200/70">Your leads are private to your account and stored in your database.</p></div>
      <div className="px-7 pb-6 text-[10px] text-violet-300/70">LEADFLOW MINI CRM · V1.0</div>
    </aside>

    <main className="min-h-screen min-w-0 flex-1 overflow-hidden bg-canvas lg:rounded-tl-[34px]">
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100/80 bg-canvas/90 px-5 py-5 backdrop-blur-xl sm:px-8">
        <div className="flex items-center gap-3"><button onClick={()=>setSidebarOpen(true)} className="rounded-xl p-2 text-slate-600 hover:bg-white lg:hidden"><Menu size={20}/></button><div><h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">{titles[page]}</h1><p className="mt-0.5 hidden text-xs text-slate-400 sm:block">Welcome back, {user.name?.split(' ')[0]}. Here's what's happening today.</p></div></div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden w-64 md:block"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/><input
  className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
  placeholder="Search leads, companies…"
  value={topQuery}
  onChange={e => setTopQuery(e.target.value)}
  onKeyDown={e => {
    if (e.key === 'Enter') {
      setQuery(topQuery);
      setPage('leads');
    }
  }}
/>
</div>
          <button onClick={loadLeads} title="Refresh leads" className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-500 hover:text-brand"><RefreshCw size={16}/></button>
          <div className="hidden h-9 w-px bg-slate-200 sm:block"/>
          <div className="flex items-center gap-2.5"><div className="grid h-9 w-9 place-items-center rounded-full bg-violet-100 text-xs font-extrabold text-brand">{initials(user.name)}</div><div className="hidden sm:block"><div className="text-xs font-bold text-slate-800">{user.name}</div><div className="text-[10px] text-slate-400">{user.role}</div></div></div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] space-y-6 px-5 py-6 sm:px-8 sm:py-8">
        {error&&<div className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"><span>{error}</span><button onClick={loadLeads}><RefreshCw size={15}/></button></div>}
        {page==='dashboard'&&<>
          <div className="flex flex-wrap items-end justify-between gap-3"><div><div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>Workspace overview</div><h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">Your pipeline at a glance</h2><p className="mt-1 text-sm text-slate-500">A little clarity goes a long way. Here's your current lead activity.</p></div><button onClick={openAdd} className="btn-primary"><Plus size={17}/>Add new lead</button></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total leads" value={metrics.total} caption="in your workspace" icon={Users} tint="bg-violet-50 text-brand" trend="Live"/>
            <MetricCard title="New leads" value={metrics.newLeads} caption="awaiting first contact" icon={UserPlus} tint="bg-sky-50 text-sky-600" trend={`${metrics.total?Math.round(metrics.newLeads/metrics.total*100):0}%`}/>
            <MetricCard title="Contacted" value={metrics.contacted} caption="outreach started" icon={Phone} tint="bg-emerald-50 text-emerald-600" trend={`${metrics.total?Math.round(metrics.contacted/metrics.total*100):0}%`}/>
            <MetricCard title="Converted" value={metrics.converted} caption="won opportunities" icon={TrendingUp} tint="bg-lime-50 text-lime-700" trend={`${metrics.total?Math.round(metrics.converted/metrics.total*100):0}%`}/>
          </div>
          <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]"><PipelineChart leads={leads}/><SourceBreakdown leads={leads}/></div>
          <section className="panel overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6"><div><h3 className="font-extrabold text-slate-900">Recently added leads</h3><p className="mt-1 text-xs text-slate-400">The latest prospects in your pipeline</p></div><button onClick={()=>setPage('leads')} className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline">View all leads <ArrowUpRight size={14}/></button></div><LeadTable leads={recent} onEdit={lead=>setModal({lead})} onDelete={setDeleteTarget} onStatus={changeStatus}/></section>
        </>}
        {page==='leads'&&<><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Manage your leads</h2><p className="mt-1 text-sm text-slate-500">Search, filter and keep every opportunity moving.</p></div><button onClick={openAdd} className="btn-primary"><Plus size={17}/>Add new lead</button></div>
          <div className="panel p-4"><div className="grid gap-3 md:grid-cols-[1fr_180px_180px_160px]"><div className="relative"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/><input className="field !pl-12" placeholder="Search name, email, company or phone…" value={query} onChange={e=>setQuery(e.target.value)}/></div><select className="field" value={status} onChange={e=>setStatus(e.target.value)}><option value="All">All statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select><select className="field" value={source} onChange={e=>setSource(e.target.value)}><option value="All">All sources</option>{SOURCES.map(s=><option key={s}>{s}</option>)}</select><select className="field" value={sort} onChange={e=>setSort(e.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="name">Name A–Z</option></select></div><div className="mt-3 flex items-center justify-between text-xs text-slate-400"><span>{filtered.length} lead{filtered.length===1?'':'s'} found</span><button onClick={()=>{setQuery('');setStatus('All');setSource('All');setSort('newest')}} className="font-bold text-brand">Clear filters</button></div></div>
          <section className="panel overflow-hidden"><div className="flex items-center justify-between px-5 py-4"><div className="font-extrabold text-slate-900">All leads <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">{filtered.length}</span></div><div className="text-xs text-slate-400">Status can be updated inline</div></div>{loading?<div className="p-12 text-center text-sm text-slate-400">Loading your leads…</div>:<LeadTable leads={filtered} onEdit={lead=>setModal({lead})} onDelete={setDeleteTarget} onStatus={changeStatus}/>}</section>
        </>}
        {page==='add'&&<div className="mx-auto max-w-3xl"><div className="mb-5"><h2 className="text-2xl font-extrabold text-slate-900">Add a new lead</h2><p className="mt-1 text-sm text-slate-500">Start with the essentials. You can update the details any time.</p></div><div className="panel p-6"><LeadModalInline onSave={async form=>{const res=await leadsApi.create(form);setLeads(p=>[res.data.lead,...p]);notify('New lead added');setPage('leads')}}/></div></div>}
        {page==='analytics'&&<><div><h2 className="text-2xl font-extrabold text-slate-900">Analytics & insights</h2><p className="mt-1 text-sm text-slate-500">Understand the shape of your current sales pipeline.</p></div><div className="grid gap-4 sm:grid-cols-3"><MetricCard title="Interested" value={metrics.interested} caption="considering your offer" icon={Activity} tint="bg-violet-50 text-brand" trend="Active"/><MetricCard title="Converted" value={metrics.converted} caption="successful conversions" icon={CheckCircle2} tint="bg-lime-50 text-lime-700" trend={`${metrics.total?Math.round(metrics.converted/metrics.total*100):0}%`}/><MetricCard title="Lost" value={metrics.lost} caption="closed opportunities" icon={ArrowDownRight} tint="bg-rose-50 text-rose-600" trend="Review"/></div><div className="grid gap-5 xl:grid-cols-2"><PipelineChart leads={leads}/><SourceBreakdown leads={leads}/></div><div className="panel p-6"><h3 className="font-extrabold text-slate-900">Status distribution</h3><div className="mt-5 grid gap-3 sm:grid-cols-5">{STATUSES.map((s,i)=><div key={s} className="rounded-2xl bg-slate-50 p-4"><Status value={s}/><div className="mt-3 text-2xl font-extrabold text-slate-900">{leads.filter(l=>l.status===s).length}</div><div className="mt-1 text-[11px] text-slate-400">{metrics.total?Math.round(leads.filter(l=>l.status===s).length/metrics.total*100):0}% of leads</div></div>)}</div></div></>}
        {page==='docs'&&<><div><h2 className="text-2xl font-extrabold text-slate-900">API & documentation</h2><p className="mt-1 text-sm text-slate-500">A quick guide to the backend powering LeadFlow.</p></div><ApiDocs/></>}
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 pt-5 text-[11px] text-slate-400"><span>© 2026 LeadFlow Mini CRM. Built for better conversations.</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>API-connected workspace</span></footer>
      </div>
    </main>

    {modal&&<LeadModal lead={modal.lead} onClose={()=>setModal(null)} onSave={saveLead}/>}
    {deleteTarget&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4"><div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-600"><Trash2/></div><h3 className="mt-4 text-lg font-extrabold text-slate-900">Delete this lead?</h3><p className="mt-2 text-sm leading-6 text-slate-500">This will permanently remove <b>{deleteTarget.fullName}</b> from your workspace.</p><div className="mt-6 flex justify-end gap-2"><button className="btn-secondary" onClick={()=>setDeleteTarget(null)}>Cancel</button><button className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-700" onClick={removeLead}>Delete lead</button></div></div></div>}
    {toast&&<div className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl"><CheckCircle2 size={17} className="text-emerald-400"/>{toast}</div>}
  </div>;
}

function LeadModalInline({onSave}) {
  const [form,setForm]=useState(initialForm),[busy,setBusy]=useState(false),[error,setError]=useState('');
  const change=(k,v)=>setForm(p=>({...p,[k]:v}));
  const submit=async e=>{e.preventDefault();setBusy(true);setError('');try{await onSave(form);setForm(initialForm)}catch(err){setError(errorText(err))}finally{setBusy(false)}};
  return <form onSubmit={submit} className="space-y-5">{error&&<div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}<div className="grid gap-4 sm:grid-cols-2">
    <label className="text-xs font-bold text-slate-600 sm:col-span-2">FULL NAME *<input className="field mt-2" required minLength="2" value={form.fullName} onChange={e=>change('fullName',e.target.value)} placeholder="Full name"/></label>
    <label className="text-xs font-bold text-slate-600">EMAIL *<input className="field mt-2" type="email" required value={form.email} onChange={e=>change('email',e.target.value)} placeholder="name@company.com"/></label>
    <label className="text-xs font-bold text-slate-600">PHONE *<input className="field mt-2" required value={form.phone} onChange={e=>change('phone',e.target.value)} placeholder="+91 98230 12345"/></label>
    <label className="text-xs font-bold text-slate-600">COMPANY *<input className="field mt-2" required minLength="2" value={form.company} onChange={e=>change('company',e.target.value)} placeholder="Company name"/></label>
    <label className="text-xs font-bold text-slate-600">SOURCE<select className="field mt-2" value={form.source} onChange={e=>change('source',e.target.value)}>{SOURCES.map(s=><option key={s}>{s}</option>)}</select></label>
    <label className="text-xs font-bold text-slate-600">STATUS<select className="field mt-2" value={form.status} onChange={e=>change('status',e.target.value)}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
    <label className="text-xs font-bold text-slate-600">DEAL VALUE<input className="field mt-2" value={form.dealValue} onChange={e=>change('dealValue',e.target.value)} placeholder="Optional"/></label>
    <label className="text-xs font-bold text-slate-600 sm:col-span-2">NOTES<textarea className="field mt-2 min-h-28" value={form.notes} onChange={e=>change('notes',e.target.value)} placeholder="Follow-up context…"/></label>
  </div><div className="flex justify-end"><button disabled={busy} className="btn-primary"><Plus size={16}/>{busy?'Saving…':'Create lead'}</button></div></form>;
}
