import { useEffect, useRef } from 'react';
import type { State } from './store';
type Tool={name:string;description:string;inputSchema:object;annotations:{readOnlyHint:boolean};execute:(input:unknown)=>unknown};
export function useAgentTools(state:State,navigate:(page:number)=>void){
 const current=useRef({state,navigate});current.current={state,navigate};
 useEffect(()=>{
  const context=(document as Document&{modelContext?:{registerTool:(tool:Tool,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
  if(!context?.registerTool)return;
  const lifecycle=new AbortController();
 const definitions:Tool[]=[{name:'read_learning_progress',description:'读取当前浏览器中的学习进度，不修改记录。',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>{const s=current.current.state;return {completedStages:s.lessons,analyzedCompanies:Object.keys(s.answers).length,activityDates:s.activity,notesCount:s.notes.length,diagnosticCompleted:Boolean(s.diagnostic?.completedAt),portfolioCount:Object.keys(s.portfolio||{}).length}}},{name:'open_learning_module',description:'打开指定学习模块，不完成任务或提交练习。page 取 0–10，依次为总览、路径、任务、案例、知识库、进度、项目中心、AI 学习主线、能力前测、AI 学习导师、作品集。',inputSchema:{type:'object',properties:{page:{type:'integer',minimum:0,maximum:10}},required:['page'],additionalProperties:false},annotations:{readOnlyHint:false},execute:(input)=>{const p=(input as {page?:unknown})?.page;if(typeof p!=='number'||!Number.isInteger(p)||p<0||p>10)throw new Error('page 必须为 0–10 的整数');current.current.navigate(p);return {openedPage:p}}}];
  for(const tool of definitions){try{void Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{})}catch{/* Optional browser capability. */}}
  return()=>lifecycle.abort();
 },[]);
}
