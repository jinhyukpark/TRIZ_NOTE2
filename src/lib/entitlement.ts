export function isEntitled(row:{active:boolean;expires_at:string|null}|null,now=Date.now()){
 return !!row?.active&&!!row.expires_at&&Number.isFinite(Date.parse(row.expires_at))&&Date.parse(row.expires_at)>now;
}
