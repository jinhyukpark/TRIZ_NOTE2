import React from 'react';
import {Text,type TextProps} from 'react-native';

// Prefer Korean word boundaries without inserting characters into the source text.
// Native layout can still wrap exceptionally long words to keep them on screen.
export default function ContentText(props:TextProps){
 return <Text lineBreakStrategyIOS="hangul-word" textBreakStrategy="highQuality" android_hyphenationFrequency="none" {...props}/>;
}
