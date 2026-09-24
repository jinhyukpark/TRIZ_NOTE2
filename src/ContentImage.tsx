import React,{useState} from 'react';
import {Image,type ImageProps,type ImageSourcePropType} from 'react-native';
/** A failed CDN request must not hide the apparatus. Remount when the URI changes. */
export default function ContentImage({fallback,...props}:ImageProps&{fallback:ImageSourcePropType}){
 const [failed,setFailed]=useState(false);
 return <Image {...props} source={failed?fallback:props.source} onError={event=>{setFailed(true);props.onError?.(event);}}/>;
}
