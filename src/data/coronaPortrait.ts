// Portrait edits of the original ring-and-needle apparatus, not replacement machinery.
export const coronaPortraits=[
 require('../../assets/content/effects/corona-discharge-01-portrait-v2.png'),
 require('../../assets/content/effects/corona-discharge-02-portrait-v2.png'),
 require('../../assets/content/effects/corona-discharge-03-portrait-v2.png'),
 require('../../assets/content/effects/corona-discharge-04-portrait-v2.png'),
 require('../../assets/content/effects/corona-discharge-05-portrait-v2.png'),
];

// Percent coordinates use the full, uncropped portrait as their coordinate space.
// Keep text out of the bitmap so locale changes also update apparatus labels.
export const coronaEquipmentLabels=[
 {number:'01',x:'62%',y:'28%',text:{ko:'링 전극',en:'Ring electrode',ja:'リング電極',zh:'环形电极'}},
 {number:'02',x:'34%',y:'51%',text:{ko:'바늘 전극',en:'Needle electrode',ja:'針電極',zh:'针电极'}},
 {number:'03',x:'12%',y:'37%',text:{ko:'공기 간극',en:'Air gap',ja:'空気間隙',zh:'空气间隙'}},
] as const;
