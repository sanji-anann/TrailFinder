// Birth-Month Trail postcard data.
//
// Each of the 12 months carries a personality (from the user's curated table),
// a short hiking quote in the personality's voice, and FOUR trails — one per
// difficulty tier (Easy / Moderate / Hard / Challenging). The postcard reveals
// ONE of the four at a time (see state/birthMonthPick.js, which spreads the pick
// across tiers so a person rarely sees the same difficulty twice).
//
// `trailId` references web/src/data/trails.js. The trail's own record supplies
// the photo, distance, difficulty label and season shown on the postcard; the
// copy here only tells the story of why that month's personality suits the walk.
//
// HARD LIMITS (both `th` and `en`, counted in Unicode code points):
//   • quote  ≤ 58 characters
//   • blurb  ≤ 280 characters
// Thai (`th`) is the primary voice; English (`en`) is a faithful parallel for the
// postcard's TH/EN toggle. Keep both within the limits when editing.

export const BIRTH_MONTHS = [
  {
    month: 1,
    personality: { en: 'The Pioneer', th: 'นักบุกเบิก' },
    quote: {
      en: 'A new world always begins after the first step.',
      th: 'โลกใบใหม่ เริ่มหลังจากก้าวแรกเสมอ',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 109,
        blurb: {
          th: 'คนเดือนมกราคมเชื่อว่าทุกการเดินทางเริ่มจากก้าวแรกที่กล้าตัดสินใจ เขาช้างเผือกในกาญจนบุรีเป็นเพียงสันเขาเล็ก ๆ แต่สันคมที่ทอดสู่หน้าผาสอนบทเรียนแรกของนักเดินป่าได้ดีที่สุด ว่าความกลัวจะจางลงเมื่อเราก้าวต่อไปทีละก้าว และการเริ่มต้นเล็ก ๆ คือจุดกำเนิดของการผจญภัยครั้งใหญ่',
          en: 'January people believe every journey starts with one brave decision. Khao Chang Phuak is only a modest ridge, but its knife-edge path to the cliff teaches a hiker’s first lesson: fear fades one step at a time, and small beginnings are where the biggest adventures are born.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 31,
        blurb: {
          th: 'คนเดือนมกราคมเชื่อว่าทุกการเดินทางเริ่มจากการตัดสินใจครั้งเดียว Mount Takao ไม่ใช่ภูเขาที่สูงที่สุดในญี่ปุ่น แต่เป็นที่ที่หลายคนค้นพบความสุขของการเดินป่าครั้งแรก เส้นทางง่าย ๆ และวิวกว้างบนยอด ความสำเร็จไม่ได้วัดจากความยาก การเริ่มต้นเล็ก ๆ ก็พาไปสู่การผจญภัยครั้งใหญ่ได้',
          en: 'January people believe every journey begins with a single decision. Mount Takao isn’t Japan’s tallest peak, yet it’s where many first discover the joy of hiking — proof that success isn’t measured by difficulty, and a small start can lead somewhere great.',
        },
      },
      {
        tier: 'Hard',
        trailId: 25,
        blurb: {
          th: 'สำหรับคนเดือนมกราคม การเริ่มต้นคือทุกสิ่ง และไม่มีสิ่งใดยิ่งใหญ่กว่าการรอแสงอรุณบนยอดฟูจิ การไต่ภูเขาศักดิ์สิทธิ์ที่สุดของญี่ปุ่นต้องอดทนตลอดคืน แต่เมื่อแสงแรกสาดขึ้นเหนือทะเลเมฆ ทุกก้าวก็คุ้มค่า ผู้บุกเบิกที่แท้จริงคือคนที่กล้าออกเดินตั้งแต่ฟ้ายังมืด',
          en: 'For January people, the start is everything — and none is grander than dawn on Fuji. Climbing Japan’s most sacred mountain demands patience through the night, but when first light breaks over a sea of cloud, every step proves its worth.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 232,
        blurb: {
          th: 'ผู้บุกเบิกไม่กลัวเป้าหมายที่ดูไกลเกินเอื้อม และคิลิมันจาโรคือเป้าหมายเช่นนั้น การเดินขึ้น "หลังคาแห่งแอฟริกา" ทางเส้นมาแชมพาผ่านทุกเขตภูมิอากาศ จากป่าฝนถึงธารน้ำแข็งใกล้ยอดที่ 5,895 เมตร ภูเขาที่ยิ่งใหญ่ไม่ได้พิชิตด้วยความเร็ว แต่ด้วยจังหวะที่มั่นคง',
          en: 'A pioneer isn’t frightened by a goal out of reach — and Kilimanjaro is exactly that. The Machame route to the “Roof of Africa” climbs through every climate zone, from rainforest to glaciers near the 5,895 m summit — won by a steady rhythm, not speed.',
        },
      },
    ],
  },
  {
    month: 2,
    personality: { en: 'The Dreamer', th: 'นักฝัน' },
    quote: {
      en: 'The world isn’t prettier — we just see it anew.',
      th: 'โลกไม่ได้สวยขึ้น เราแค่มองมันต่างไป',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 112,
        blurb: {
          th: 'คนเดือนกุมภาพันธ์เป็นนักฝันที่มองเห็นความงามในรายละเอียดเล็ก ๆ เส้นทางกิ่วแม่ปานบนดอยอินทนนท์จึงเหมือนออกแบบมาเพื่อพวกเขา เช้าฤดูหนาว ทะเลหมอกไหลล้นสันเขาขณะกุหลาบพันปีผลิบานริมทาง เตือนว่าความฝันที่งดงามที่สุดบางครั้งก็ซ่อนอยู่ใกล้แค่ปลายจมูก',
          en: 'February people are dreamers who find beauty in small details, and the Kew Mae Pan trail on Doi Inthanon feels made for them. On a winter morning a sea of fog spills over the ridge while rhododendrons bloom — a reminder the loveliest dreams often hide close by.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 6,
        blurb: {
          th: 'นักฝันเดือนกุมภาพันธ์มักจินตนาการถึงปลายทางก่อนออกเดินเสมอ Roys Peak เหนือทะเลสาบวานากาในนิวซีแลนด์ตอบแทนจินตนาการนั้นอย่างงดงาม ทางซิกแซกที่ค่อย ๆ ไต่สูงอาจดูไม่จบสิ้น แต่ที่จุดชมวิว ทะเลสาบสีครามและเทือกเขาสุดสายตาก็สวยเกินกว่าความฝันใดจะวาดไว้',
          en: 'February dreamers picture the destination long before they set out, and Roys Peak above Lake Wanaka rewards that beautifully. The zigzag climb seems endless, but at the lookout the blue lake and the ranges to the horizon are lovelier than any dream could draw.',
        },
      },
      {
        tier: 'Hard',
        trailId: 215,
        blurb: {
          th: 'สำหรับนักฝัน โลกควรมีสีสันและกลิ่นอายของเรื่องเล่า ชิงเกวเตร์เรบนชายฝั่งลิกูเรียของอิตาลีคือโลกแบบนั้น เส้นทางสายสีฟ้าเลียบหน้าผาเชื่อมห้าหมู่บ้านประมงสีลูกกวาด ผ่านไร่องุ่นขั้นบันไดและทะเลเมดิเตอร์เรเนียนสีน้ำเงินเข้ม ทุกโค้งเหมือนหน้าหนึ่งในนิทาน',
          en: 'For a dreamer, the world should have colour and the scent of a story — and Cinque Terre on Italy’s Ligurian coast is that world. The Blue Trail traces cliffs between five fishing villages, past vineyards and the deep blue sea. Every bend reads like a fairy tale.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 223,
        blurb: {
          th: 'นักฝันที่กล้าฝันใหญ่ย่อมถูกดึงดูดสู่ปาตาโกเนีย เส้นทาง W ในตอร์เรสเดลไปเนพาเดินผ่านยอดหินแกรนิตที่พุ่งชนฟ้า ธารน้ำแข็งสีคราม และทะเลสาบสีเทอร์คอยซ์ ท่ามกลางสายลมที่แรงราวมีชีวิต ที่นี่พิสูจน์ว่าความฝันที่ยิ่งใหญ่ มักแลกด้วยการเดินทางที่ไกลและกล้าหาญที่สุด',
          en: 'A dreamer bold enough to dream big is drawn to Patagonia. The W trek through Torres del Paine passes granite towers that stab at the sky, blue glaciers and turquoise lakes, under wind that feels alive. The grandest dreams ask for the bravest journey in return.',
        },
      },
    ],
  },
  {
    month: 3,
    personality: { en: 'The Curious Wanderer', th: 'นักเดินทางช่างสงสัย' },
    quote: {
      en: 'The more you travel, the more pages the world has.',
      th: 'ยิ่งออกเดินทาง โลกยิ่งมีหน้าให้อ่าน',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 108,
        blurb: {
          th: 'คนเดือนมีนาคมเต็มไปด้วยความอยากรู้ และภูกระดึงคือภูเขาที่ตอบแทนความอยากรู้นั้นทีละชั้น ทางขึ้นแสนยาวไต่สู่ที่ราบยอดตัดคล้ายโต๊ะ ซึ่งซ่อนทุ่งหญ้า ป่าสน หน้าผาชมตะวัน และใบเมเปิลแดงในฤดูหนาว ยิ่งเดินสำรวจ ยิ่งพบว่าโลกบนยอดเขากว้างและน่าค้นหากว่าที่คิดมาก',
          en: 'March people brim with curiosity, and Phu Kradueng rewards it layer by layer. The long climb tops out on a table-flat plateau hiding meadows, pine forest, sunrise cliffs and red winter maples. The more you explore, the wider and stranger the summit world becomes.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 30,
        blurb: {
          th: 'นักเดินทางช่างสงสัยมักหลงใหลเรื่องราวเก่าแก่ที่ซ่อนตามเส้นทาง คุมาโนะโคโดในวากายามะคือเส้นทางแสวงบุญพันปีที่เต็มไปด้วยสิ่งเหล่านั้น บันไดหินคลุมมอสทอดผ่านป่าซีดาร์สู่ศาลเจ้าโบราณและหมู่บ้านออนเซ็น ทุกก้าวคือคำตอบว่าทำไมผู้คนจึงเดินเส้นทางนี้ซ้ำมานับศตวรรษ',
          en: 'A curious wanderer is drawn to old stories hidden along a trail, and the Kumano Kodō in Wakayama is full of them. Moss-covered stone steps thread through cedar forest to ancient shrines and hot-spring villages — every step asking why people have walked here for a thousand years.',
        },
      },
      {
        tier: 'Hard',
        trailId: 236,
        blurb: {
          th: 'สำหรับคนช่างสงสัย การเดินคือการอ่านประวัติศาสตร์ด้วยฝ่าเท้า เส้นทางนากาเซนโดช่วงมาโกเมะถึงสึมาโกะพาย้อนสู่ยุคเอโดะ ผ่านถนนหินเก่า ป่าซีดาร์ และเมืองไปรษณีย์ที่ยังรักษารูปเดิมไว้ ระฆังไล่หมีริมทางเตือนว่าเรากำลังเดินอยู่ในเรื่องเล่าที่มีชีวิตจริง',
          en: 'For the curious, walking is reading history with your feet. The Nakasendo between Magome and Tsumago carries you back to the Edo era, along old stone roads, cedar forest and preserved post towns. Bear bells by the path remind you you’re inside a living story, not a book.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 209,
        blurb: {
          th: 'การเดินรอบเทือกเขาอันนาปุรณะคือการเปลี่ยนภูมิประเทศแทบทุกวัน จากหมู่บ้านเล็ก ๆ และป่าเขียวขจี ไปจนถึงช่องเขาสูงที่รายล้อมด้วยหิมะ คนเดือนมีนาคมมักไม่กลัวสิ่งใหม่และพร้อมเปิดรับสิ่งที่แตกต่าง เส้นทางนี้ตอบแทนความอยากรู้ด้วยมุมมองใหม่ที่งดงามและลึกซึ้ง',
          en: 'Walking the Annapurna Circuit means the landscape changes almost every day — from small villages and green forest to a high pass ringed with snow. March people rarely fear the unfamiliar, and this trail repays their curiosity with views deeper than expected.',
        },
      },
    ],
  },
  {
    month: 4,
    personality: { en: 'The Adventurer', th: 'นักผจญภัย' },
    quote: {
      en: 'Step past the familiar and life starts its story.',
      th: 'ก้าวพ้นความคุ้นเคย แล้วชีวิตจะเริ่มเล่าเรื่อง',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 107,
        blurb: {
          th: 'คนเดือนเมษายนมีไฟในตัวและชอบท้าทายขีดจำกัดตัวเอง ดอยหลวงเชียงดาว ยอดหินปูนสูงอันดับสามของไทย คือสนามซ้อมที่เร้าใจ ทางชันไต่สู่สันเขาที่ลอยเหนือทะเลเมฆ ท่ามกลางอากาศเบาบางและวิวไร้ขอบเขต ไม่ใช่ภูเขาที่ใครก็ขึ้นได้ง่าย และนั่นคือเหตุผลที่นักผจญภัยหลงรักมัน',
          en: 'April people carry a fire and love testing their limits, and Doi Luang Chiang Dao — Thailand’s third-highest limestone peak — is a thrilling proving ground. A steep climb reaches a ridge above the cloud sea. It isn’t one just anyone strolls up, and that’s why adventurers love it.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 228,
        blurb: {
          th: 'นักผจญภัยรู้ว่าประสบการณ์ที่ดีที่สุดมักเริ่มก่อนฟ้าสาง การไต่ภูเขาไฟบาตูร์ในบาหลีท่ามกลางความมืดเพื่อรอพระอาทิตย์ขึ้นบนขอบปล่องคือหนึ่งในนั้น เมื่อแสงแรกฉายเหนือทะเลสาบในปากปล่องและยอดอากุงไกล ๆ ความเหนื่อยก็กลายเป็นความตื่นเต้นล้วน ๆ ที่จุดไฟในใจได้เต็มที่',
          en: 'An adventurer knows the best experiences often begin before dawn — like climbing Bali’s Mount Batur in the dark to wait for sunrise on the crater rim. When first light spills over the caldera lake and distant Mount Agung, tiredness gives way to pure exhilaration.',
        },
      },
      {
        tier: 'Hard',
        trailId: 229,
        blurb: {
          th: 'สำหรับคนเดือนเมษายน ยิ่งท้าทายยิ่งเร้าใจ และรินจานีบนเกาะลอมบกคือคำท้าที่ยากจะปฏิเสธ เส้นทางหลายวันจากเซมบาลุนไต่สู่ขอบปล่องที่มองลงเห็นทะเลสาบซือการา อานัคสีเทอร์คอยซ์ กับยอดภูเขาไฟลูกเล็กที่ยังคุกรุ่นกลางน้ำ มันเหนื่อยสาหัส แต่เป็นรางวัลที่มีเพียงคนกล้าจะได้เห็น',
          en: 'For April people, the tougher the challenge, the greater the thrill — and Rinjani on Lombok is hard to refuse. The multi-day route from Sembalun climbs to a crater rim above the turquoise Segara Anak lake and its small, still-smoking cone — a reward only the bold earn.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 233,
        blurb: {
          th: 'นักผจญภัยตัวจริงยอมนอนกลางลมหนาวเพื่อแลกกับภาพที่ไม่มีวันลืม การไต่ภูเขาไฟอากาเตนันโกในกัวเตมาลาแล้วตั้งแคมป์ค้างคืนคือเช่นนั้น เพราะตรงหน้าคือภูเขาไฟฟวยโกที่ระเบิดพ่นลาวาแดงฉานเป็นระยะทั้งคืน เป็นการเผชิญหน้ากับพลังดิบของโลกที่จุดวิญญาณนักผจญภัยให้ลุกโชน',
          en: 'A true adventurer will sleep out in the cold for a sight they’ll never forget — like climbing Guatemala’s Acatenango and camping overnight. Across the valley, Volcán de Fuego erupts glowing lava all night — a close encounter with the earth’s raw power.',
        },
      },
    ],
  },
  {
    month: 5,
    personality: { en: 'The Independent Explorer', th: 'นักสำรวจผู้เป็นอิสระ' },
    quote: {
      en: 'Stray from others’ paths and you may find your own.',
      th: 'หลงจากทางของคนอื่น อาจเจอทางของตัวเอง',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 114,
        blurb: {
          th: 'คนเดือนพฤษภาคมรักอิสระและมักเดินตามจังหวะของตัวเอง ดอยม่อนจองในเชียงใหม่จึงเหมาะกับหัวใจแบบนั้น สันเขาที่ทอดยาวผ่านทุ่งหญ้าและป่าเปลี่ยนสี พร้อมความเงียบสงบที่หาได้ยาก มอบพื้นที่ให้ได้อยู่กับตัวเอง ที่นี่ไม่มีใครเร่ง มีแต่คุณ สายลม และเส้นทางที่ค่อย ๆ เปิดออกทีละก้าว',
          en: 'May people love their freedom and move at their own pace, so Doi Mon Jong in Chiang Mai suits that heart. Its long ridge runs through meadows and colour-shifting forest, wrapped in a rare quiet. Nobody rushes here — just you, the wind, and a path opening one step at a time.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 216,
        blurb: {
          th: 'การเดินกามิโนเดซานติอาโกไม่ได้วัดกันที่ความเร็ว แต่วัดที่การได้เดินในจังหวะของตัวเอง ผู้คนจากทั่วโลกออกเดินบนเส้นทางแสวงบุญนี้ด้วยเหตุผลต่างกัน แต่ทุกคนได้พบบางอย่างระหว่างทาง คนรักอิสระจะเข้าใจดีว่า บางครั้งการเดินคนเดียวคือการได้กลับมาอยู่กับตัวเองอย่างแท้จริง',
          en: 'The Camino de Santiago isn’t measured in speed but in the freedom to walk at your own pace. Pilgrims worldwide set out for different reasons, yet each finds something along the way. May people know it well: sometimes walking alone is how you come home to yourself.',
        },
      },
      {
        tier: 'Hard',
        trailId: 217,
        blurb: {
          th: 'นักสำรวจผู้เป็นอิสระชอบเส้นทางที่พาข้ามพรมแดนทั้งบนแผนที่และในใจ Tour du Mont Blanc คือวงกลมยาวรอบเทือกเขามงบล็องที่ทอดผ่านฝรั่งเศส อิตาลี และสวิตเซอร์แลนด์ในการเดินครั้งเดียว แต่ละวันเปลี่ยนภาษา อาหาร และมุมมองของยอดเขาสีขาว เป็นเสรีภาพแบบที่คนรักอิสระใฝ่หา',
          en: 'An independent explorer loves a trail that crosses borders — on the map and within. The Tour du Mont Blanc circles the Mont Blanc massif through France, Italy and Switzerland in one walk, each day changing the language, the food and the angle on that white summit.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 218,
        blurb: {
          th: 'คนรักอิสระที่แข็งแกร่งจริงย่อมถูกท้าทายด้วย GR20 เส้นทางที่ขึ้นชื่อว่าโหดที่สุดในยุโรป เส้นทางบนเกาะคอร์ซิกาสายนี้ไต่ข้ามสันเขาหิน หน้าผา และภูมิประเทศดิบเถื่อนที่ต้องพึ่งพาตัวเองเป็นหลัก ไม่มีทางลัด ไม่มีใครช่วย มีเพียงคุณกับภูเขา และนั่นคืออิสรภาพที่บริสุทธิ์ที่สุด',
          en: 'An independent soul with real strength is tested by the GR20, famed as Europe’s toughest trail. Crossing Corsica, it climbs rocky ridges, cliffs and wild terrain where you rely on yourself. No shortcuts, no rescue — just you and the mountain, freedom in its purest form.',
        },
      },
    ],
  },
  {
    month: 6,
    personality: { en: 'The Free Spirit', th: 'จิตวิญญาณเสรี' },
    quote: {
      en: 'Not every wandering needs a way back.',
      th: 'ไม่ใช่ทุกการหลงทาง ที่ต้องหาทางกลับ',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 115,
        blurb: {
          th: 'คนเดือนมิถุนายนมีจิตวิญญาณเสรีและรักการปล่อยใจไปกับธรรมชาติ เขาหลวงสุโขทัยที่ตั้งตระหง่านเหนือเมืองเก่าคือที่ที่เหมาะกับใจแบบนั้น ป่าดิบเขียวชอุ่ม สายน้ำตก และวิวเมืองประวัติศาสตร์เบื้องล่าง ชวนให้เดินอย่างไร้กังวล ที่นี่ไม่มีตารางเวลา มีเพียงเสียงป่าและก้าวเท้าที่เป็นอิสระ',
          en: 'June people have a free spirit and love letting their minds drift with nature. Khao Luang, above the old city of Sukhothai, is made for that heart — lush forest, waterfalls and a view over the historic plains. No timetable — only the forest and footsteps that answer to no one.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 237,
        blurb: {
          th: 'จิตวิญญาณเสรีไม่ต้องการยอดเขาสูงเสมอไป บางครั้งแค่หุบเขาที่งดงามก็เพียงพอ คามิโคจิในเทือกเขาแอลป์ญี่ปุ่นคือหุบเขาเช่นนั้น ทางเดินเลียบแม่น้ำอาซูสะสีใสราวคริสตัลทอดผ่านใต้เงายอดโฮตากะ ให้เดินอย่างไม่รีบร้อน ที่นี่สอนว่าอิสรภาพอยู่ที่การได้ปล่อยใจไปกับความงามตรงหน้า',
          en: 'A free spirit doesn’t always need a high summit — sometimes a beautiful valley is enough. Kamikochi, in the Japan Alps, is such a place. A path follows the crystal-clear Azusa River beneath the Hotaka peaks: freedom isn’t conquering, but giving your heart to the beauty ahead.',
        },
      },
      {
        tier: 'Hard',
        trailId: 88,
        blurb: {
          th: 'คนใจอิสระถูกดึงดูดด้วยดินแดนที่ดูไม่เหมือนโลกใบเดิม เส้นทางเลากาเวกูร์ในไอซ์แลนด์คือดินแดนเช่นนั้น ภูเขาไรโอไลต์หลากสี ทุ่งลาวา น้ำพุร้อน และธารน้ำแข็งสลับกันไปตลอดทาง ราวกับเดินอยู่บนดาวดวงอื่น ยิ่งเดินลึกเข้าไป ยิ่งรู้สึกเป็นอิสระจากทุกสิ่งที่เคยคุ้นเคย',
          en: 'Free spirits are pulled toward places that look like another world, and Iceland’s Laugavegur is exactly that. Rainbow rhyolite mountains, lava fields, hot springs and glaciers trade places the whole way. The deeper you go, the freer you feel from everything familiar.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 226,
        blurb: {
          th: 'อิสรภาพขั้นสูงสุดคือการได้อยู่ในที่ที่ไม่มีเส้นทางให้เดินตาม Wind River High Route ในไวโอมิงคือดินแดนแบบนั้น สองในสามของเส้นทางไม่มีทางเดินชัดเจน ต้องอ่านภูมิประเทศเอง ท่ามกลางทะเลสาบใสและยอดหินแกรนิตที่แทบไม่มีผู้คน เป็นเสรีภาพที่มอบให้เฉพาะคนที่กล้าออกไปหามันเอง',
          en: 'The ultimate freedom is being somewhere with no trail to follow, and the Wind River High Route in Wyoming is that place. Two-thirds has no marked path — you read the terrain yourself, among clear lakes and granite peaks, the freedom the wild gives only to the brave.',
        },
      },
    ],
  },
  {
    month: 7,
    personality: { en: 'The Nature Lover', th: 'คนรักธรรมชาติ' },
    quote: {
      en: 'The closer to nature, the closer to yourself.',
      th: 'ยิ่งเข้าใกล้ธรรมชาติ ยิ่งกลับมาใกล้ตัวเอง',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 234,
        blurb: {
          th: 'คนเดือนกรกฎาคมรักธรรมชาติแบบอ่อนโยนและเห็นความมหัศจรรย์ในสิ่งเล็ก ๆ น้ำตกเอราวัณเจ็ดชั้นในกาญจนบุรีคือของขวัญสำหรับหัวใจแบบนั้น เส้นทางไต่เลาะป่าไผ่สู่แอ่งน้ำสีมรกตที่มีปลาแหวกว่าย ให้ได้ลงแช่และฟังเสียงน้ำ ความสุขที่แท้จริงบางครั้งก็เรียบง่ายเท่าสายน้ำใสและร่มเงาไม้',
          en: 'July people love nature gently and see wonder in the smallest things. The seven tiers of Erawan Waterfall in Kanchanaburi are a gift for that heart — a path through bamboo forest to emerald pools where fish swim. Real happiness can be as simple as clear water and shade.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 219,
        blurb: {
          th: 'คนรักธรรมชาติย่อมตกหลุมรักพลิตวิเซในโครเอเชียตั้งแต่แรกเห็น ทางเดินไม้ทอดข้ามทะเลสาบสีเทอร์คอยซ์ที่ไล่ระดับลดหลั่นด้วยน้ำตกนับร้อย น้ำใสจนมองเห็นฝูงปลาและต้นไม้จมอยู่เบื้องล่าง ทุกก้าวคือการเดินอยู่ท่ามกลางงานศิลป์ที่ธรรมชาติค่อย ๆ รังสรรค์ตลอดหลายพันปี',
          en: 'A nature lover falls for Plitvice in Croatia at first sight. Boardwalks cross terraced turquoise lakes that step down through hundreds of waterfalls, the water so clear you see fish and sunken trees below — a work of art nature has shaped for thousands of years.',
        },
      },
      {
        tier: 'Hard',
        trailId: 220,
        blurb: {
          th: 'สำหรับคนรักธรรมชาติ การได้เดินซึมซับภูมิประเทศทั้งวันคือความสุขล้ำค่า West Highland Way ในสกอตแลนด์มอบสิ่งนั้นตลอด 154 กิโลเมตร ผ่านทุ่งพรุ ทะเลสาบ และเนินเขาโล่งกว้างของไฮแลนด์ มันมักเป็นเส้นทางไกลสายแรกของใครหลายคน และเป็นบทเรียนว่าธรรมชาติที่เงียบสงบก็เยียวยาใจได้',
          en: 'For a nature lover, whole days soaking in the landscape are a rare joy, and Scotland’s West Highland Way offers it across 154 kilometres of moor, loch and open Highland hills. Often a first long-distance walk — proof that wild, quiet country can heal the heart.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 227,
        blurb: {
          th: 'คนรักธรรมชาติตัวจริงฝันถึงการได้ใช้ชีวิตอยู่ท่ามกลางขุนเขาเป็นสัปดาห์ John Muir Trail ในเทือกเขาเซียร์ราเนวาดาทำให้ฝันนั้นเป็นจริง เส้นทางราว 340 กิโลเมตรจากโยเซมิตีสู่ยอดวิตนีย์ พาผ่านทะเลสาบอัลไพน์ ทุ่งหญ้า และช่องเขาสูงวันแล้ววันเล่า ให้ได้กลับไปเป็นส่วนหนึ่งของธรรมชาติ',
          en: 'A true nature lover dreams of living among the mountains for weeks, and the John Muir Trail in the Sierra Nevada makes it real. Some 340 kilometres from Yosemite to Mount Whitney pass alpine lakes, meadows and high passes — a chance to become part of nature again.',
        },
      },
    ],
  },
  {
    month: 8,
    personality: { en: 'The Brave Heart', th: 'หัวใจกล้าหาญ' },
    quote: {
      en: 'The world widens each time you step past fear.',
      th: 'โลกกว้างขึ้น ทุกครั้งที่เราก้าวข้ามความกลัว',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 110,
        blurb: {
          th: 'คนเดือนสิงหาคมมีหัวใจกล้าหาญและไม่หวั่นแม้ต้องเดินฝ่าอุปสรรค ภูสอยดาวคือเส้นทางที่เข้าใจหัวใจแบบนั้นดี เพราะเป็นหนึ่งในไม่กี่ยอดที่เปิดให้เดินในฤดูฝน ทางลื่นและชันไต่สู่ลานสนและทุ่งดอกไม้กว้างใหญ่บนยอด รางวัลปลายทางจึงเป็นของคนที่กล้าเดินต่อแม้สายฝนจะโปรยลงมา',
          en: 'August people have a brave heart and don’t flinch at hardship, and Phu Soi Dao understands that — one of the few Thai peaks open in the rainy season. The slippery, steep climb reaches a plateau of pines and wildflowers. The reward belongs to those who keep going in the rain.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 65,
        blurb: {
          th: 'หัวใจกล้าหาญมักถูกเรียกร้องโดยยอดเขาที่สูงที่สุด และคินาบาลูคือยอดที่สูงที่สุดในเอเชียตะวันออกเฉียงใต้ การไต่ขึ้นในความมืดเพื่อรอแสงแรกบนยอดหินแกรนิตที่ 4,095 เมตร ต้องใช้ทั้งแรงกายและใจที่ไม่ยอมแพ้ เมื่อตะวันพ้นทะเลเมฆ คุณจะรู้ว่าความกล้าพาคุณมาไกลแค่ไหน',
          en: 'A brave heart is called by the highest peaks, and Kinabalu is the highest in Southeast Asia. Climbing in darkness to the granite summit at 4,095 m, in cold, thin air, demands a will that won’t quit. When the sun clears the cloud sea, you see how far courage carried you.',
        },
      },
      {
        tier: 'Hard',
        trailId: 213,
        blurb: {
          th: 'สำหรับคนกล้า ก้าวแรกสู่โลกของภูเขาสูงคือช่วงเวลาที่น่าตื่นเต้นที่สุด Yala Peak ในเนปาลคือก้าวแรกนั้น ยอดเขาเทรคกิ้งพีคที่พาผู้มาเยือนสัมผัสหิมะ น้ำแข็ง และอากาศเบาบางของหิมาลัยเป็นครั้งแรก มันเปิดประตูสู่โลกที่สูงกว่าและกล้าหาญกว่า ให้คนที่พร้อมก้าวข้ามความกลัว',
          en: 'For the brave, the first step into the high mountains is the most thrilling of all, and Nepal’s Yala Peak is that step — a trekking peak that lets newcomers touch the snow, ice and thin air of the Himalaya for the first time, opening the door to a bolder world.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 214,
        blurb: {
          th: 'หัวใจที่กล้าหาญที่สุดย่อมมองหาความท้าทายที่ยิ่งใหญ่ที่สุด Island Peak หรืออิมจาเซในเนปาลที่ความสูง 6,189 เมตรคือความท้าทายนั้น การไต่ต้องใช้เชือก ตะปูปีนน้ำแข็ง และการข้ามรอยแยกธารน้ำแข็ง ท่ามกลางยอดหิมาลัยที่ล้อมรอบ มันพิสูจน์ว่าความกลัวเป็นเพียงสิ่งที่รอให้เราก้าวข้าม',
          en: 'The bravest heart looks for the greatest challenge, and Nepal’s Island Peak — Imja Tse, at 6,189 m — is that challenge. The climb calls for ropes, crampons and crossing glacier crevasses, ringed by Himalayan giants. Proof that fear only waits for us to step past it.',
        },
      },
    ],
  },
  {
    month: 9,
    personality: { en: 'The Balanced Explorer', th: 'นักสำรวจผู้สมดุล' },
    quote: {
      en: 'Don’t rush to arrive and forget you’re alive.',
      th: 'อย่ามัวแต่ไปให้ถึง จนลืมว่าเรากำลังมีชีวิต',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 172,
        blurb: {
          th: 'คนเดือนกันยายนมองหาความสมดุลในทุกสิ่ง และดอยขุนตานในลำปางก็ให้ความสมดุลนั้นอย่างพอดี ป่าสนร่มรื่น อากาศเย็นสบาย และเส้นทางที่ไม่ยากเกินไปแต่ก็ไม่ง่ายจนน่าเบื่อ พาขึ้นสู่ยอดอย่างค่อยเป็นค่อยไป เตือนว่าการเดินป่าที่ดีไม่จำเป็นต้องสุดโต่ง แค่พอดีกับใจก็เพียงพอ',
          en: 'September people look for balance in everything, and Doi Khun Tan in Lampang offers exactly that. Shady pine forest, cool air and a path neither too hard nor dull carry you up at a steady pace. A good hike needn’t be extreme — being just right for the heart is enough.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 238,
        blurb: {
          th: 'นักสำรวจผู้สมดุลชื่นชอบเส้นทางที่ให้ทั้งความงามและความท้าทายในสัดส่วนลงตัว วงรอบเตรเชเมดีลาวาเรโดในเทือกเขาโดโลไมต์คือเช่นนั้น ทางเดินราว 10 กิโลเมตรวนรอบสามยอดหินที่พุ่งขึ้นตรงราวหอคอย ผ่านช่องเขาและกระท่อมพักบนภูเขา ไม่ยากเกินไปแต่งดงามจนน่าจดจำ เป็นวันเดินที่สมดุลอย่างสมบูรณ์',
          en: 'A balanced explorer loves a trail that gives beauty and challenge in equal measure, and the Tre Cime di Lavaredo loop in the Dolomites is just that. Around 10 kilometres circle the three tower-straight peaks, past a pass and alpine huts — not too demanding, yet unforgettable.',
        },
      },
      {
        tier: 'Hard',
        trailId: 221,
        blurb: {
          th: 'เมื่อพร้อมสำหรับสิ่งที่มากขึ้น นักสำรวจผู้สมดุลจะก้าวสู่ Alta Via 1 เส้นทางไฮรูทคลาสสิกที่ทอดผ่านใจกลางเทือกเขาโดโลไมต์ราว 8-10 วัน เดินจากกระท่อมสู่กระท่อม ผ่านทุ่งหญ้าอัลไพน์ ช่องเขาหินปูน และแสงเอนโรซาดิราสีชมพูยามอัสดง สมดุลระหว่างความท้าทายกับความสุขในแต่ละคืนใต้ยอดเขา',
          en: 'When ready for more, a balanced explorer steps up to Alta Via 1, the classic high route through the heart of the Dolomites over eight days. Hut to hut, you cross alpine meadows, limestone passes and the pink enrosadira glow at sunset — the distance balanced by each quiet night.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 222,
        blurb: {
          th: 'สำหรับนักสำรวจผู้สมดุล เส้นทางในฝันคือการเดินที่ท้าทายแต่ไม่สุดโต่งจนขาดความงาม Walker’s Haute Route จากชาโมนิกซ์สู่แซร์มัทท์คือเช่นนั้น เชื่อมสองเมืองหลวงแห่งการปีนเขาผ่านช่องเขาสูงกว่า 2,800 เมตรหลายแห่ง จบที่เชิงยอดมัทเทอร์ฮอร์น เป็นส่วนผสมของความอึด ความสูง และทิวทัศน์แอลป์',
          en: 'For a balanced explorer, the dream is a walk that challenges without losing its beauty, and the Walker’s Haute Route from Chamonix to Zermatt is exactly that — linking two mountaineering capitals over passes above 2,800 m, ending beneath the famous Matterhorn.',
        },
      },
    ],
  },
  {
    month: 10,
    personality: { en: 'The Photographer', th: 'ช่างภาพนักเดินทาง' },
    quote: {
      en: 'Change your eyes and the same world turns new.',
      th: 'เปลี่ยนสายตา โลกใบเดิมก็กลายเป็นที่ใหม่',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 113,
        blurb: {
          th: 'คนเดือนตุลาคมมองโลกผ่านสายตาช่างภาพ และเส้นทางอ่างกาบนยอดดอยอินทนนท์คือสตูดิโอกลางแจ้งของพวกเขา ทางเดินไม้สั้น ๆ ลัดเลาะป่าดิบเขาที่ปกคลุมด้วยมอสและเฟิร์นชุ่มชื้น ท่ามกลางสายหมอกและแสงที่ลอดผ่านเรือนยอด ทุกมุมคือเฟรมที่รอบันทึก แม้เป็นเส้นทางที่สั้นแต่เต็มไปด้วยรายละเอียด',
          en: 'October people see the world through a photographer’s eyes, and the Ang Ka trail atop Doi Inthanon is their open-air studio. A short boardwalk winds through mossy, fern-draped cloud forest, in mist and light through the canopy — the shortest trail, endlessly full of frames.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 37,
        blurb: {
          th: 'ช่างภาพนักเดินทางรู้ว่าแสงและฉากที่ยิ่งใหญ่คือทุกสิ่ง เทือกเขาทาเทยามะในญี่ปุ่นมอบทั้งสองอย่างอย่างเหลือเฟือ เส้นทางผ่านที่ราบสูงมุโรโด กำแพงหิมะสูงตระหง่านในต้นฤดู และใบไม้เปลี่ยนสีจัดจ้านในฤดูใบไม้ร่วง ท่ามกลางยอดแอลป์ญี่ปุ่นที่สะท้อนในสระน้ำนิ่ง เป็นฉากที่อยากหยุดเวลาเอาไว้',
          en: 'A traveling photographer knows great light and a great scene are everything, and Japan’s Tateyama range gives both. The trail crosses the Murodo plateau, past towering early-season snow walls and blazing autumn colour, among Japan-Alps peaks mirrored in still ponds.',
        },
      },
      {
        tier: 'Hard',
        trailId: 212,
        blurb: {
          th: 'สำหรับช่างภาพ ไม่มีแบบใดยิ่งใหญ่กว่ายอดเขาที่สูงที่สุดในโลก Everest View Trek ในเนปาลพาเข้าใกล้แบบนั้นอย่างไม่ยากเกินไป เส้นทางผ่านหมู่บ้านนัมเช บาซาร์ ป่าสน และวัดบนเนินเขา ก่อนเปิดออกสู่ภาพเอเวอเรสต์และยอดอามาดาบลัมที่คมชัด เป็นเฟรมในฝันโดยไม่ต้องขึ้นถึงเบสแคมป์',
          en: 'For a photographer, no subject is grander than the highest mountain on earth, and Nepal’s Everest View Trek brings you close — past Namche Bazaar, pine forest and a hilltop monastery to crisp views of Everest and Ama Dablam. A dream frame, no Base Camp required.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 224,
        blurb: {
          th: 'ช่างภาพที่กล้าเดินไกลที่สุดจะได้ภาพที่คนอื่นไม่มีวันได้เห็น เส้นทาง O Circuit ในตอร์เรสเดลไปเนคือเช่นนั้น วงรอบเต็มพาไปยังฝั่งที่เงียบสงบกว่า ผ่านช่องเขาจอห์น การ์เนอร์ที่เปิดออกสู่ธารน้ำแข็งเกรย์กว้างสุดสายตา ทุกวันคือแสงที่เปลี่ยนไป มอบเฟรมที่ไม่ซ้ำเดิมให้คนที่เดินไกลกว่าใคร',
          en: 'A photographer bold enough to walk the farthest earns images no one else will see, and the O Circuit in Torres del Paine is exactly that — the full loop to the park’s quieter side, over the John Garner Pass onto the vast Grey Glacier, a fresh frame in every changing light.',
        },
      },
    ],
  },
  {
    month: 11,
    personality: { en: 'The Quiet Seeker', th: 'ผู้แสวงหาความสงบ' },
    quote: {
      en: 'Some journeys go far to bring us back within.',
      th: 'บางการเดินทางไกล เพื่อพาเรากลับมาข้างใน',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 114,
        blurb: {
          th: 'คนเดือนพฤศจิกายนแสวงหาความเงียบสงบ และเส้นทางธรรมชาติดอยม่อนจองก็มอบความเงียบนั้นอย่างเต็มเปี่ยม สันเขาที่ทอดผ่านทุ่งหญ้าและป่าอันห่างไกลผู้คน ปล่อยให้มีเพียงเสียงลมและเสียงก้าวเท้าของเราเอง ในความสงบเช่นนี้ ความคิดที่วุ่นวายค่อย ๆ จางหาย เหลือเพียงความสงบที่หาได้ยากในทุกวัน',
          en: 'November people seek out quiet, and the Doi Mon Jong nature trail gives it in full. Its ridge runs through meadows and remote forest far from the crowds, leaving only wind and footsteps. In stillness like this, the mind’s noise fades to a calm hard to find in daily life.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 46,
        blurb: {
          th: 'ผู้แสวงหาความสงบย่อมหลงใหลป่าที่เก่าแก่และเงียบงัน ยาคุชิมะในญี่ปุ่นคือป่าเช่นนั้น เส้นทางผ่านป่าฝนคลุมมอสไปสู่โจมงสุกิ ต้นซีดาร์ยักษ์ที่มีอายุนับพันปี ทุกอย่างชุ่มชื้น เงียบสงบ ราวหลุดออกมาจากความฝัน ที่นี่ความเงียบไม่ได้ว่างเปล่า แต่เต็มไปด้วยเสียงกระซิบของกาลเวลา',
          en: 'A quiet seeker is drawn to ancient, silent forests, and Yakushima in Japan is one of them. The trail winds through moss-cloaked rainforest to Jōmon Sugi, a giant cedar thousands of years old. Everything is damp and hushed — a silence not empty, but full of the whisper of time.',
        },
      },
      {
        tier: 'Hard',
        trailId: 210,
        blurb: {
          th: 'บางครั้งความสงบที่ลึกที่สุดกลับพบได้ในที่ที่ยิ่งใหญ่ที่สุด อันนาปุรณะเบสแคมป์ในเนปาลคือเช่นนั้น เส้นทางไต่ผ่านหมู่บ้านและป่าไผ่สู่แอ่งกลางหุบเขาที่โอบล้อมด้วยยอดเขาหิมะรอบทิศ ยามค่ำ ท้องฟ้าเต็มไปด้วยดวงดาวและความเงียบแผ่ปกคลุม เป็นความนิ่งที่แท้จริงกลางอ้อมกอดของขุนเขา',
          en: 'Sometimes the deepest peace is found in the grandest places, and Annapurna Base Camp in Nepal is one of them. The trail climbs through villages and forest to a basin ringed by snow peaks. At night the sky fills with stars — true stillness in the arms of the mountains.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 230,
        blurb: {
          th: 'ผู้แสวงหาความสงบที่กล้าเดินไกลจะพบความเงียบที่บริสุทธิ์ที่สุดในที่ที่ห่างไกลผู้คน วงรอบเทือกเขาอวยไวช์ในเปรูคือที่แบบนั้น เส้นทางอัลไพน์ห่างไกลที่ล้อมด้วยยอดเขาหยักคมและทะเลสาบสีเทอร์คอยซ์ แทบไม่มีผู้คนและสัญญาณจากโลกภายนอก ในความโดดเดี่ยวนี้ เราจะได้ยินเพียงเสียงหัวใจตัวเอง',
          en: 'A quiet seeker willing to walk far finds the purest silence where people are fewest, and Peru’s Huayhuash Circuit is such a place — a remote alpine path ringed by jagged peaks and turquoise lakes, no signal from the outside world. In that solitude, all you hear is your own heart.',
        },
      },
    ],
  },
  {
    month: 12,
    personality: { en: 'The Story Collector', th: 'นักเก็บเรื่องราว' },
    quote: {
      en: 'Life stays as long, but travel makes it wider.',
      th: 'ชีวิตยาวเท่าเดิม แต่การเดินทางทำให้มันกว้างขึ้น',
    },
    trails: [
      {
        tier: 'Easy',
        trailId: 239,
        blurb: {
          th: 'คนเดือนธันวาคมคือนักเก็บเรื่องราว และการเดินทางไปทีลอซูก็เป็นเรื่องเล่าในตัวมันเอง กว่าจะถึงน้ำตกที่ใหญ่ที่สุดของไทยกลางเขตรักษาพันธุ์สัตว์ป่าอุ้มผาง ต้องผ่านถนนคดเคี้ยวและป่าลึก แต่เมื่อสายน้ำมหึมาไหลลงหน้าผาปรากฏตรงหน้า ทุกความยากลำบากก็กลายเป็นเรื่องเล่าที่ควรค่าแก่การจดจำ',
          en: 'December people are collectors of stories, and the journey to Thi Lo Su is a story in itself. Reaching Thailand’s largest waterfall, in Umphang, means winding roads and thick forest — but when that huge curtain of water appears, every hardship becomes a tale worth keeping.',
        },
      },
      {
        tier: 'Moderate',
        trailId: 8,
        blurb: {
          th: 'นักเก็บเรื่องราวรักช่วงเวลาที่เรียบง่ายแต่ตราตรึง เส้นทางฮุกเกอร์แวลลีย์ในนิวซีแลนด์มอบช่วงเวลาเช่นนั้น ทางเดินง่าย ๆ ข้ามสะพานแขวนสามแห่งไปสู่ทะเลสาบธารน้ำแข็งที่มีภูเขาน้ำแข็งลอยอยู่ เบื้องหลังคือยอดเอารากิ เมาต์คุกที่สูงที่สุดในประเทศ เป็นเรื่องเล่าที่อยากเก็บภาพไว้ตลอดไป',
          en: 'A story collector loves moments simple yet unforgettable, and New Zealand’s Hooker Valley track gives exactly that. An easy path crosses three swing bridges to a glacial lake with icebergs, backed by Aoraki / Mount Cook — a short, beautiful story you’ll want to keep forever.',
        },
      },
      {
        tier: 'Hard',
        trailId: 211,
        blurb: {
          th: 'สำหรับนักเก็บเรื่องราว ไม่มีการเดินทางใดเล่าขานได้เท่าการไปถึงเบสแคมป์ของเอเวอเรสต์ เส้นทางในหุบเขาคุมบูพาผ่านหมู่บ้านเชอร์ปา วัดบนภูเขา และสะพานแขวนเหนือหุบเหว ก่อนถึงเชิงยอดเขาที่สูงที่สุดในโลก ทุกวันคือบทใหม่ และเมื่อกลับมา มันจะกลายเป็นเรื่องที่เล่าซ้ำได้ไม่รู้เบื่อ',
          en: 'For a story collector, no journey tells like reaching Everest Base Camp. The trail through the Khumbu valley passes Sherpa villages, hillside monasteries and suspension bridges over deep gorges to the foot of the world’s highest peak — a story you’ll happily retell for life.',
        },
      },
      {
        tier: 'Challenging',
        trailId: 225,
        blurb: {
          th: 'เรื่องราวที่ยิ่งใหญ่ที่สุดมักมาจากการเดินทางที่กล้าหาญที่สุด และอากอนกากัวคือหนึ่งในนั้น ยอดเขาที่สูงที่สุดนอกเทือกเขาหิมาลัยที่ 6,961 เมตรในเทือกเขาแอนดีส เรียกร้องความอดทน การปรับตัวกับความสูง และใจที่แน่วแน่ การได้ยืนบนยอดนี้คือบทสรุปของเรื่องเล่าที่ติดตัวไปตลอดชีวิต',
          en: 'The greatest stories come from the bravest journeys, and Aconcagua is one of them — at 6,961 m, the highest peak outside the Himalaya. It demands endurance, acclimatisation and a steady will over weeks. Standing on this summit is the closing chapter you’ll carry for life.',
        },
      },
    ],
  },
]

// Convenience lookup: month number (1–12) → its birth-month entry.
export function birthMonthFor(month) {
  return BIRTH_MONTHS.find((m) => m.month === month) ?? null
}
