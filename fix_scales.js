const fs = require('fs');
let content = fs.readFileSync('/home/gauransh-arora/Projects/Sat-website-26/src/DestinationScroller.tsx', 'utf8');

// T1 Backgrounds
content = content.replace(
  /transition1\.fromTo\(\s*nextBackground,[\s\S]*?scale: 1\.2,[\s\S]*?scale: 1\.2,[\s\S]*?BACKGROUND_FADE_START\s*\);/,
`transition1.fromTo(
        nextBackground,
        {
          opacity: 0,
          rotation: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          rotation: 25,
          scale: 1.28,
          duration: BACKGROUND_FADE_DURATION,
          ease: "power2.inOut",
          force3D: true,
        },
        BACKGROUND_FADE_START
      );`
);

// T1 Images
content = content.replace(
  /transition1\.fromTo\(\s*innerNext,[\s\S]*?scale: 1\.2,[\s\S]*?scale: 1,[\s\S]*?INNER_REVEAL_START\s*\);/,
`transition1.fromTo(
        innerNext,
        { opacity: 0, scale: 1.4 },
        { opacity: 1, scale: 1.28, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        INNER_REVEAL_START
      );`
);
content = content.replace(
  /transition1\.fromTo\(\s*outerNext,[\s\S]*?scale: 1\.2,[\s\S]*?scale: 1,[\s\S]*?OUTER_REVEAL_START\s*\);/,
`transition1.fromTo(
        outerNext,
        { opacity: 0, scale: 1.4 },
        { opacity: 1, scale: 1.28, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        OUTER_REVEAL_START
      );`
);

// T2 Backgrounds
content = content.replace(
  /transition2\.fromTo\(\s*nextBackground,[\s\S]*?rotation: 0,[\s\S]*?scale: 1\.2,[\s\S]*?rotation: 25,[\s\S]*?scale: 1\.28,[\s\S]*?0\s*\);/,
`transition2.fromTo(
        nextBackground,
        { rotation: 25, scale: 1.28 },
        { rotation: 50, scale: 1.36, duration: 2.7, ease: "power2.inOut", force3D: true },
        0
      );`
);
content = content.replace(
  /transition2\.fromTo\(\s*thirdBackground,[\s\S]*?scale: 1\.2,[\s\S]*?scale: 1\.2,[\s\S]*?BACKGROUND_FADE_START\s*\);/,
`transition2.fromTo(
        thirdBackground,
        { opacity: 0, rotation: 25, scale: 1.28 },
        { opacity: 1, rotation: 50, scale: 1.36, duration: BACKGROUND_FADE_DURATION, ease: "power2.inOut", force3D: true },
        BACKGROUND_FADE_START
      );`
);

// T2 Images
content = content.replace(
  /transition2\.to\(\s*innerNext,[\s\S]*?scale: 1\.2,[\s\S]*?INNER_REVEAL_START\s*\);/,
`transition2.to(
        innerNext,
        { opacity: 0, scale: 1.5, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        INNER_REVEAL_START
      );`
);
content = content.replace(
  /transition2\.fromTo\(\s*innerThird,[\s\S]*?scale: 1\.2,[\s\S]*?scale: 1,[\s\S]*?INNER_REVEAL_START\s*\);/,
`transition2.fromTo(
        innerThird,
        { opacity: 0, scale: 1.5 },
        { opacity: 1, scale: 1.36, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        INNER_REVEAL_START
      );`
);
content = content.replace(
  /transition2\.to\(\s*outerNext,[\s\S]*?scale: 1\.2,[\s\S]*?OUTER_REVEAL_START\s*\);/,
`transition2.to(
        outerNext,
        { opacity: 0, scale: 1.5, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        OUTER_REVEAL_START
      );`
);
content = content.replace(
  /transition2\.fromTo\(\s*outerThird,[\s\S]*?scale: 1\.2,[\s\S]*?scale: 1,[\s\S]*?OUTER_REVEAL_START\s*\);/,
`transition2.fromTo(
        outerThird,
        { opacity: 0, scale: 1.5 },
        { opacity: 1, scale: 1.36, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        OUTER_REVEAL_START
      );`
);

// T3 Backgrounds
content = content.replace(
  /transition3\.fromTo\(\s*thirdBackground,[\s\S]*?rotation: 0,[\s\S]*?scale: 1\.2,[\s\S]*?rotation: 25,[\s\S]*?scale: 1\.28,[\s\S]*?0\s*\);/,
`transition3.fromTo(
        thirdBackground,
        { rotation: 50, scale: 1.36 },
        { rotation: 75, scale: 1.44, duration: 2.7, ease: "power2.inOut", force3D: true },
        0
      );`
);
content = content.replace(
  /transition3\.fromTo\(\s*fourthBackground,[\s\S]*?scale: 1\.2,[\s\S]*?scale: 1\.2,[\s\S]*?BACKGROUND_FADE_START\s*\);/,
`transition3.fromTo(
        fourthBackground,
        { opacity: 0, rotation: 50, scale: 1.36 },
        { opacity: 1, rotation: 75, scale: 1.44, duration: BACKGROUND_FADE_DURATION, ease: "power2.inOut", force3D: true },
        BACKGROUND_FADE_START
      );`
);

// T3 Images
content = content.replace(
  /transition3\.to\(\s*innerThird,[\s\S]*?scale: 1\.2,[\s\S]*?INNER_REVEAL_START\s*\);/,
`transition3.to(
        innerThird,
        { opacity: 0, scale: 1.6, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        INNER_REVEAL_START
      );`
);
content = content.replace(
  /transition3\.fromTo\(\s*innerFourth,[\s\S]*?scale: 1\.2,[\s\S]*?scale: 1,[\s\S]*?INNER_REVEAL_START\s*\);/,
`transition3.fromTo(
        innerFourth,
        { opacity: 0, scale: 1.6 },
        { opacity: 1, scale: 1.44, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        INNER_REVEAL_START
      );`
);
content = content.replace(
  /transition3\.to\(\s*outerThird,[\s\S]*?scale: 1\.2,[\s\S]*?OUTER_REVEAL_START\s*\);/,
`transition3.to(
        outerThird,
        { opacity: 0, scale: 1.6, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        OUTER_REVEAL_START
      );`
);
content = content.replace(
  /transition3\.fromTo\(\s*outerFourth,[\s\S]*?scale: 1\.2,[\s\S]*?scale: 1,[\s\S]*?OUTER_REVEAL_START\s*\);/,
`transition3.fromTo(
        outerFourth,
        { opacity: 0, scale: 1.6 },
        { opacity: 1, scale: 1.44, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        OUTER_REVEAL_START
      );`
);


// T1 Image Zoom In (Current images)
content = content.replace(
  /transition1\.to\(\s*innerCurrent,[\s\S]*?scale: 1\.2,[\s\S]*?INNER_REVEAL_START\s*\);/,
`transition1.to(
        innerCurrent,
        { opacity: 0, scale: 1.4, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        INNER_REVEAL_START
      );`
);
content = content.replace(
  /transition1\.to\(\s*outerCurrent,[\s\S]*?scale: 1\.2,[\s\S]*?OUTER_REVEAL_START\s*\);/,
`transition1.to(
        outerCurrent,
        { opacity: 0, scale: 1.4, duration: IMAGE_REVEAL_DURATION, ease: "power2.inOut" },
        OUTER_REVEAL_START
      );`
);


fs.writeFileSync('/home/gauransh-arora/Projects/Sat-website-26/src/DestinationScroller.tsx', content);
