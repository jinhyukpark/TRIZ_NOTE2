import React,{useState} from 'react';
import {Image,type ImageProps,type ImageSourcePropType} from 'react-native';
/** A failed CDN request must not hide the apparatus. Remount when the URI changes. */
export default function ContentImage({fallback,...props}:ImageProps&{fallback:ImageSourcePropType}){
 if(!props.source||typeof props.source!=='object'||!('uri' in props.source))return <Image resizeMethod="resize" {...props}/>;
 return <RemoteImage key={props.source.uri} fallback={fallback} {...props}/>;
}
function RemoteImage({fallback,...props}:ImageProps&{fallback:ImageSourcePropType}){
 const [failed,setFailed]=useState(false);
 return <Image resizeMethod="resize" {...props} source={failed?fallback:props.source} onError={event=>{setFailed(true);props.onError?.(event);}}/>;
}
