export const BAYES_COOKIE={prior:[.5,.5],likelihood:[.75,.5],weight:[.375,.25],posterior:[.6,.4]};
export const JOINT_PROBABILITIES=[[.05,.10,.05],[.10,.30,.10],[.05,.10,.15]];
export function betaDensity(x,a=8,b=4){
 if(x<0||x>1)return 0;
 const factorial=n=>{let v=1;for(let i=2;i<=n;i++)v*=i;return v;};
 return factorial(a+b-1)/(factorial(a-1)*factorial(b-1))*x**(a-1)*(1-x)**(b-1);
}
export function betaCdf(x,a=8,b=4){
 if(x<=0)return 0;if(x>=1)return 1;
 const n=a+b-1;let sum=0,choose=1;
 for(let j=0;j<=n;j++){if(j>=a)sum+=choose*x**j*(1-x)**(n-j);choose*= (n-j)/(j+1);}
 return sum;
}
export function betaQuantile(probability,a=8,b=4){
 if(probability<=0)return 0;if(probability>=1)return 1;
 let lo=0,hi=1;for(let i=0;i<60;i++){const mid=(lo+hi)/2;if(betaCdf(mid,a,b)<probability)lo=mid;else hi=mid;}return (lo+hi)/2;
}
export function makeMetropolisDemo(){
 let seed=23,x=0,accepted=0;const chain=[];
 const uniform=()=>{seed=(1664525*seed+1013904223)>>>0;return (seed+.5)/4294967296;};
 const normal=()=>Math.sqrt(-2*Math.log(uniform()))*Math.cos(2*Math.PI*uniform());
 for(let i=0;i<1200;i++){
  const proposal=x+.9*normal();
  if(uniform()<Math.min(1,Math.exp((x*x-proposal*proposal)/2))){x=proposal;accepted++;}
  chain.push(x);
 }
 const draws=chain.slice(200),bins=Array(30).fill(0),minimum=-5,width=10/bins.length;
 for(const value of draws){const j=Math.floor((value-minimum)/width);if(j>=0&&j<bins.length)bins[j]++;}
 return {draws,bins,minimum,binWidth:width,accepted,iterations:1200,burnIn:200};
}
