// Teaching milestones group the original chapters; they do not replace the TOC.
export const LEARNING_STAGES = [
 {id:'foundations',chapters:[1,2,3],title:['建立機率的語言','Speak the language of probability'],goal:['理解條件機率，學會用新證據更新信念。','Understand conditional probability and update beliefs with evidence.'],milestone:['能說明先驗、概似與後驗如何連在一起。','Explain how prior, likelihood and posterior fit together.']},
 {id:'estimation',chapters:[4,5,6,7,8],title:['把未知量變成分布','Represent unknowns with distributions'],goal:['從比例、數量到事件率，練習估計與預測。','Estimate proportions, counts and event rates, then make predictions.'],milestone:['能用分布與區間表達估計的不確定性。','Express uncertainty using distributions and intervals.']},
 {id:'decisions',chapters:[9,10,11,12,13],title:['比較證據，做出判斷','Compare evidence and make decisions'],goal:['將推論用在決策、檢定、分類與組間比較。','Apply inference to decisions, testing, classification and group comparisons.'],milestone:['能區分模型比較、分類與參數差異的問題。','Distinguish model comparison, classification and parameter differences.']},
 {id:'models',chapters:[14,15,16,17],title:['走進真實資料的模型','Model real-world data'],goal:['處理等待時間、族群大小，以及變數間的關係。','Work with event times, population sizes and relationships between variables.'],milestone:['能依資料問題辨認模型與關鍵假設。','Identify a model and its key assumptions for a data problem.']},
 {id:'computation',chapters:[18,19,20],title:['選擇合適的計算方法','Choose a computation method'],goal:['從共軛更新走向 MCMC 與模擬式推論。','Move from conjugate updates to MCMC and simulation-based inference.'],milestone:['能說明解析更新、抽樣與近似推論的差別。','Explain the differences between analytic updates, sampling and approximate inference.']}
];

export const CHAPTER_DESTINATIONS = {
 1:['讀懂條件機率','Read conditional probabilities'],2:['完成一次貝氏更新','Perform a Bayesian update'],3:['用 PMF 描述分布','Describe distributions with a PMF'],
 4:['估計未知的比例','Estimate an unknown proportion'],5:['估計數量與可信區間','Estimate counts and credible intervals'],6:['用勝算更新證據','Update evidence using odds'],7:['處理極值與混合分布','Work with extremes and mixtures'],8:['估計事件率與未來次數','Estimate event rates and future counts'],
 9:['用預測比較行動','Compare actions with predictions'],10:['比較模型與假設','Compare models and hypotheses'],11:['建立與讀取聯合分布','Build and read joint distributions'],12:['從特徵推論類別','Infer a class from its features'],13:['量化組間的差異','Quantify differences between groups'],
 14:['理解存活時間與設限','Understand survival times and censoring'],15:['由再捕資料推估族群','Estimate populations from recaptures'],16:['建模二元結果的機率','Model probabilities of binary outcomes'],17:['描述趨勢並預測觀察','Describe trends and predict observations'],
 18:['認識共軛先驗的更新','Recognize conjugate prior updates'],19:['以抽樣近似後驗','Approximate posteriors with samples'],20:['用模擬進行近似推論','Use simulation for approximate inference']
};

export function buildLearningPath(chapters, lessons, readIds, lastLessonId){
 const read=new Set(readIds),byId=new Map(lessons.map(l=>[l.id,l]));
 const ordered=chapters.flatMap(c=>c.sectionIds).map(id=>byId.get(id)).filter(Boolean);
 const next=ordered.find(l=>!read.has(l.id))||null;
 const last=byId.get(lastLessonId)||null;
 const stages=LEARNING_STAGES.map(stage=>{
  const items=stage.chapters.map(id=>chapters.find(c=>c.id===id)).filter(Boolean).map(chapter=>{
   const count=chapter.sectionIds.filter(id=>read.has(id)).length;
   return {...chapter,readCount:count,complete:count===chapter.sectionIds.length,nextId:chapter.sectionIds.find(id=>!read.has(id))||chapter.sectionIds[0]};
  });
  return {...stage,items,total:items.reduce((n,c)=>n+c.sectionIds.length,0),readCount:items.reduce((n,c)=>n+c.readCount,0)};
 });
 return {stages,next,last,readCount:ordered.filter(l=>read.has(l.id)).length,total:ordered.length};
}
