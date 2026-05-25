// OPIc Study Data Module - Curated high-frequency speaking patterns, fillers, and templates.

export const OPIC_CATEGORIES = [
  {
    id: 'intro',
    name: '자기소개',
    engName: 'Self-Introduction',
    icon: '👤',
    description: '시험의 시작을 여는 가장 기본적이고 자연스러운 자기소개 핵심 패턴입니다.',
    difficulty: 'All Levels'
  },
  {
    id: 'housing',
    name: '주거지 & 동네',
    engName: 'Housing & Neighborhood',
    icon: '🏠',
    description: '집 구조, 가구, 동네 묘사 및 거주지 주변에서 일어나는 일과를 묻는 단골 질문 대비 패턴입니다.',
    difficulty: 'IM / IH / AL'
  },
  {
    id: 'hobby',
    name: '취미 & 여가생활',
    engName: 'Hobbies & Leisure',
    icon: '🎸',
    description: '음악 감상, 공원 가기, 조깅 등 서베이 선택 기반 질문에 유연하게 대응하는 만능 패턴입니다.',
    difficulty: 'IM / IH / AL'
  },
  {
    id: 'travel',
    name: '여행 & 휴가',
    engName: 'Travel & Vacations',
    icon: '✈️',
    description: '국내외 여행 경험, 기억에 남는 휴가, 여행 중 겪은 돌발 상황 묘사 패턴입니다.',
    difficulty: 'IH / AL'
  },
  {
    id: 'roleplay',
    name: '롤플레이 & 돌발',
    engName: 'Roleplay & Situations',
    icon: '🎭',
    description: '상황극 질문(문의하기, 대안 제시하기)과 예측 불가능한 돌발 질문을 극복하는 패턴입니다.',
    difficulty: 'IH / AL'
  }
];

export const OPIC_PATTERNS = [
  // --- Category: Intro (자기소개) ---
  {
    id: 'p_intro_1',
    categoryId: 'intro',
    pattern: 'I would describe myself as a/an [adjective] person.',
    meaning: '저는 스스로를 [형용사]한 사람이라고 말하고 싶습니다.',
    explanation: '성격이나 평소 성향을 깔끔하고 자연스럽게 묘사하는 만능 오프닝 패턴입니다.',
    tip: 'outgoing, detail-oriented, active, easy-going 같은 형용사를 넣어서 연습해보세요!',
    examples: [
      {
        en: 'I would describe myself as a very outgoing and sociable person.',
        ko: '저는 제 스스로를 매우 외향적이고 사교적인 사람이라고 표현하고 싶습니다.'
      },
      {
        en: 'I would describe myself as a detail-oriented person who loves organizing things.',
        ko: '저는 물건 정리하는 것을 좋아하는 꼼꼼한 사람이라고 스스로를 소개하고 싶습니다.'
      },
      {
        en: 'To start off, I would describe myself as an easy-going individual.',
        ko: '우선, 저는 제 자신을 성격이 둥글둥글하고 무던한 사람이라고 말하고 싶네요.'
      }
    ]
  },
  {
    id: 'p_intro_2',
    categoryId: 'intro',
    pattern: 'I am currently majoring in [subject] / working as a/an [job].',
    meaning: '저는 현재 [전공]을 전공하고 있으며, / [직업]으로 일하고 있습니다.',
    explanation: '학생인지 직장인인지 본인의 현재 신분을 명확하고 직관적으로 설명할 때 유용합니다.',
    tip: 'working as a freelancer, working in the IT sector 등 구체적인 분야를 덧붙이면 점수가 상승합니다.',
    examples: [
      {
        en: 'I am currently majoring in computer science at national university.',
        ko: '저는 현재 국립대학교에서 컴퓨터 공학을 전공하고 있습니다.'
      },
      {
        en: 'I am currently working as a marketing assistant in a financial firm.',
        ko: '저는 현재 금융 회사에서 마케팅 보조 직원으로 일하고 있습니다.'
      },
      {
        en: 'I am currently working as a graphic designer, which I absolutely love.',
        ko: '저는 현재 그래픽 디자이너로 일하고 있는데, 제 일을 정말 사랑합니다.'
      }
    ]
  },
  {
    id: 'p_intro_3',
    categoryId: 'intro',
    pattern: 'In my spare time, I usually enjoy [activity/V-ing].',
    meaning: '여가 시간에 저는 보통 [활동/-ing]을 즐깁니다.',
    explanation: '자기소개 하반부에 본인의 취미와 관심사로 자연스럽게 화제를 넘기는 브릿지 패턴입니다.',
    tip: 'enjoy 뒤에는 동명사(-ing) 형태나 명사를 위치시켜야 합니다.',
    examples: [
      {
        en: 'In my spare time, I usually enjoy listening to acoustic music in a cozy cafe.',
        ko: '여가 시간에 저는 보통 아늑한 카페에서 어쿠스틱 음악 듣는 것을 즐깁니다.'
      },
      {
        en: 'In my spare time, I usually enjoy playing mobile games with my close friends.',
        ko: '한가할 때, 저는 대개 친한 친구들과 함께 모바일 게임 하는 것을 즐깁니다.'
      },
      {
        en: 'Generally, in my spare time, I usually enjoy taking a stroll along the river.',
        ko: '대체로 시간이 날 때 저는 강변을 따라 산책하는 것을 즐기곤 합니다.'
      }
    ]
  },
  {
    id: 'p_intro_4',
    categoryId: 'intro',
    pattern: 'My ultimate goal for the future is to [action].',
    meaning: '미래에 대한 저의 궁극적인 목표는 [동사원형]하는 것입니다.',
    explanation: '자기소개의 멋진 마무리를 장식할 수 있는 포부 및 비전 제시용 패턴입니다.',
    tip: 'is to travel around the world, is to start my own business 등을 붙여 풍성하게 매듭지으세요.',
    examples: [
      {
        en: 'My ultimate goal for the future is to set up my own fashion brand.',
        ko: '저의 미래 궁극적인 목표는 나만의 패션 브랜드를 시작하는 것입니다.'
      },
      {
        en: 'Actually, my ultimate goal for the future is to become a top expert in my field.',
        ko: '사실, 저의 미래 궁극적인 목표는 제가 종사하는 분야에서 최고의 전문가가 되는 것입니다.'
      }
    ]
  },

  // --- Category: Housing (주거지 & 동네) ---
  {
    id: 'p_housing_1',
    categoryId: 'housing',
    pattern: 'What I like most about my home is [noun / the fact that...].',
    meaning: '우리 집에서 내가 가장 마음에 들어 하는 부분은 [명사 / ~라는 점]입니다.',
    explanation: '거주지 묘사 질문에서 가장 좋아하는 공간이나 가구, 특징을 강조하며 말을 이어가기 좋습니다.',
    tip: 'is the cozy balcony, is the fact that it gets a lot of sunlight 등으로 응용해보세요.',
    examples: [
      {
        en: 'What I like most about my home is my cozy bedroom setup.',
        ko: '우리 집에서 제가 가장 좋아하는 공간은 아늑하게 꾸며진 제 침실입니다.'
      },
      {
        en: 'What I like most about my home is the fact that it is flooded with sunlight.',
        ko: '우리 집에서 내가 가장 마음에 들어 하는 부분은 햇빛이 정말 잘 들어온다는 사실입니다.'
      },
      {
        en: 'To be honest, what I like most about my home is the spacious living room.',
        ko: '솔직히 말해서, 우리 집에서 제가 가장 좋아하는 부분은 넓은 거실입니다.'
      }
    ]
  },
  {
    id: 'p_housing_2',
    categoryId: 'housing',
    pattern: 'It is located in a [description] neighborhood with [facilities].',
    meaning: '저희 집은 [특징] 동네에 위치해 있으며, 주변에 [시설]이 있습니다.',
    explanation: '동네 묘사 및 집 위치 설명 시 주변 환경과 편의시설을 엮어서 답하기 최적화된 문장입니다.',
    tip: 'located in a quiet residential area, located in a bustling downtown 등으로 수식어를 바꿔보세요.',
    examples: [
      {
        en: 'It is located in a peaceful residential neighborhood with a beautiful public park nearby.',
        ko: '저희 집은 조용한 주택가 동네에 위치하고 있으며, 근처에 아름다운 공원이 있습니다.'
      },
      {
        en: 'My house is located in a lively neighborhood with tons of trendy cafes and grocery stores.',
        ko: '우리 집은 트렌디한 카페들과 식료품점들이 아주 많은 활기찬 동네에 자리 잡고 있습니다.'
      }
    ]
  },
  {
    id: 'p_housing_3',
    categoryId: 'housing',
    pattern: 'Whenever I walk into my house, I feel a sense of [feeling].',
    meaning: '집에 들어설 때마다 저는 [감정]을 느낍니다.',
    explanation: '집이 자신에게 주는 정서적인 의미를 감성적으로 묘사하여 고득점(IH/AL)을 유도합니다.',
    tip: 'a sense of comfort, a sense of relief, completely relaxed 등의 감정 명사/형용사를 활용합니다.',
    examples: [
      {
        en: 'Whenever I walk into my house, I feel an instant sense of relief and comfort.',
        ko: '집에 발을 디딜 때마다, 저는 즉시 안도감과 편안함을 느낍니다.'
      },
      {
        en: 'Whenever I walk into my house, I feel a great sense of warmth and peace.',
        ko: '집에 들어올 때마다 저는 따뜻함과 평화로움을 진하게 느낍니다.'
      }
    ]
  },

  // --- Category: Hobby (취미 & 여가생활) ---
  {
    id: 'p_hobby_1',
    categoryId: 'hobby',
    pattern: 'I have been really into [hobby/activity] recently.',
    meaning: '저는 요즘 [취미/활동]에 정말 푹 빠져 있습니다.',
    explanation: '최근 관심사나 취미를 소개하며 유행하거나 꽂힌 분야를 자연스럽게 꺼내는 오프닝 패턴입니다.',
    tip: 'into 대신 crazy about, obsessed with을 사용하여 관심의 수준을 높여 설명할 수도 있습니다.',
    examples: [
      {
        en: 'I have been really into bouldering and rock climbing recently.',
        ko: '저는 최근에 볼더링และ 암벽 등반에 정말 깊이 빠져 있습니다.'
      },
      {
        en: 'To tell you the truth, I have been really into baking organic desserts recently.',
        ko: '사실대로 말씀드리면, 전 요즘 유기농 디저트를 굽는 베이킹에 완전 꽂혀 있어요.'
      },
      {
        en: 'I have been really into hiking with my dog on weekends recently.',
        ko: '저는 요즈음 주말에 반려견과 함께 등산하는 것에 아주 푹 빠졌습니다.'
      }
    ]
  },
  {
    id: 'p_hobby_2',
    categoryId: 'hobby',
    pattern: 'It serves as a great way to relieve my stress and recharge.',
    meaning: '그것은 제 스트레스를 풀고 재충전하는 훌륭한 방법 역할을 합니다.',
    explanation: '오픽에서 왜 그 취미를 즐기는지 이유를 설명할 때 쓰는 최고의 만능 템플릿 문장입니다. 어떤 취미든 다 연결됩니다.',
    tip: 'serves as a perfect outlet to vent stress 처럼 다채롭게 표현해 보세요.',
    examples: [
      {
        en: 'Listening to calm lo-fi beats serves as a great way to relieve my stress and recharge.',
        ko: '잔잔한 로파이 음악을 듣는 것은 제 스트레스를 풀고 재충전하는 아주 좋은 방법이 되어 줍니다.'
      },
      {
        en: 'For me, jogging in the evening serves as a great way to relieve my stress and recharge after work.',
        ko: '저에게는 퇴근 후 저녁에 조깅을 하는 것이 스트레스를 해소하고 에너지를 충전하는 최고의 방법입니다.'
      }
    ]
  },
  {
    id: 'p_hobby_3',
    categoryId: 'hobby',
    pattern: 'I usually try to make time for it at least [frequency].',
    meaning: '저는 보통 적어도 [빈도]만큼은 그것을 위한 시간을 내려고 노력합니다.',
    explanation: '취미 활동을 얼마나 자주 하는지 빈도수와 계획성을 설명하며 답변에 구체성을 더해줍니다.',
    tip: 'at least once a week, twice a month, every single day 등으로 응용 가능합니다.',
    examples: [
      {
        en: 'Even though I am busy, I usually try to make time for it at least twice a week.',
        ko: '바쁘기는 하지만, 저는 보통 일주일에 적어도 두 번은 그것을 하기 위해 시간을 내려고 노력합니다.'
      },
      {
        en: 'I usually try to make time for reading books at least 30 minutes every single day.',
        ko: '저는 대개 매일 적어도 30분은 독서를 하기 위해 시간을 확보하려고 의식적으로 노력합니다.'
      }
    ]
  },

  // --- Category: Travel (여행 & 휴가) ---
  {
    id: 'p_travel_1',
    categoryId: 'travel',
    pattern: 'Looking back, one of the most memorable trips was to [destination].',
    meaning: '되돌아보면, 가장 기억에 남는 여행 중 하나는 [목적지]였습니다.',
    explanation: '과거 여행 경험이나 인상적이었던 휴가를 회상하는 질문에서 바로 첫 단추로 꿰기 완벽한 패턴입니다.',
    tip: 'Looking back, Retrospectively, Thinking about it 등을 문두에 넣어 원어민 스러운 느낌을 줍니다.',
    examples: [
      {
        en: 'Looking back, one of the most memorable trips was to Jeju Island three years ago.',
        ko: '돌이켜보면, 가장 기억에 남는 여행 중 하나는 3년 전에 갔던 제주도 여행이었습니다.'
      },
      {
        en: 'Looking back, one of the most memorable trips was a family trip to Paris.',
        ko: '기억을 되짚어 보면, 가장 인상 깊었던 여행 중 하나는 온 가족이 함께 떠난 파리 여행이었습니다.'
      }
    ]
  },
  {
    id: 'p_travel_2',
    categoryId: 'travel',
    pattern: 'The place was absolutely breathtaking and beyond my expectation.',
    meaning: '그 장소는 정말 숨이 막힐 정도로 아름다웠고 제 기대를 뛰어넘었습니다.',
    explanation: '여행지의 경치, 숙소, 맛집 등을 묘사할 때 감정을 잔뜩 실어서 점수를 획득할 수 있는 고득점 형용사 패턴입니다.',
    tip: 'breathtaking(숨 막히는), beyond my expectation(기대 이상인) 등 고난도 형용사를 적극 사용하세요.',
    examples: [
      {
        en: 'The emerald beach in Guam was absolutely breathtaking and beyond my expectation.',
        ko: '괌의 에메랄드빛 해변은 정말 숨이 멎을 만큼 아름다웠고 제 기대를 훨씬 뛰어넘었습니다.'
      },
      {
        en: 'Honestly, the mountain view at dawn was absolutely breathtaking and totally worth the hike.',
        ko: '솔직히 새벽녘의 산 전망은 말도 안 되게 아름다웠고 등산할 만한 가치가 백번 있었습니다.'
      }
    ]
  },
  {
    id: 'p_travel_3',
    categoryId: 'travel',
    pattern: 'Out of nowhere, an unexpected problem arose when [situation].',
    meaning: '갑작스럽게, [상황]일 때 전혀 예상치 못한 문제가 발생했습니다.',
    explanation: '오픽 AL 등급 획득에 필수적인 "돌발 문제 해결 및 과거 사건 묘사" 흐름을 전개하는 최고의 위기 전환 문장입니다.',
    tip: 'Out of nowhere(난데없이), unexpected problem(예상치 못한 문제)은 드라마틱한 서사 전개에 필수적입니다.',
    examples: [
      {
        en: 'Out of nowhere, an unexpected problem arose when I realized I lost my passport at the airport.',
        ko: '난데없이, 공항에서 여권을 잃어버렸다는 것을 깨달았을 때 예상치 못한 문제가 생겼습니다.'
      },
      {
        en: 'Out of nowhere, an unexpected problem arose when our rental car suddenly broke down on the highway.',
        ko: '느닷없이, 고속도로에서 렌터카가 갑자기 고장 나 멈추면서 골치 아픈 문제가 발생했습니다.'
      }
    ]
  },

  // --- Category: Roleplay (롤플레이 & 돌발) ---
  {
    id: 'p_roleplay_1',
    categoryId: 'roleplay',
    pattern: 'Hi there, I am calling to inquire about [issue/product].',
    meaning: '안녕하세요, [문제/제품]에 대해 문의드리려고 전화했습니다.',
    explanation: '전화 통화 기반의 롤플레이(11번 질문 등)에서 자연스럽게 대화를 트는 표준 오프닝 패턴입니다.',
    tip: 'Hi there, Hello, Excuse me 등을 활용하여 대화하듯이 연기하듯 발음해야 합니다.',
    examples: [
      {
        en: 'Hi there, I am calling to inquire about booking a room for next Friday.',
        ko: '안녕하세요, 다음 주 금요일에 방을 예약하는 것에 대해 문의하려고 전화드렸습니다.'
      },
      {
        en: 'Hello, I am calling to inquire about the refund policy of the ticket I purchased yesterday.',
        ko: '안녕하세요, 제가 어제 구매한 티켓의 환불 규정에 대해 여쭤보려고 전화했습니다.'
      }
    ]
  },
  {
    id: 'p_roleplay_2',
    categoryId: 'roleplay',
    pattern: 'Would it be possible to [alternative option] instead?',
    meaning: '대신에 [대안적인 선택]을 하는 것이 가능할까요?',
    explanation: '롤플레이 문제 상황(12번 질문)에서 상대방에게 예의 바르게 대안을 제시하며 타협점을 찾을 때 요긴합니다.',
    tip: 'Would it be possible to~ 패턴은 비즈니스 및 일상 영어에서도 정말 정중한 표현입니다.',
    examples: [
      {
        en: 'Would it be possible to get a voucher or store credit instead?',
        ko: '대신에 상품권이나 매장 적립금으로 돌려받는 것이 가능할까요?'
      },
      {
        en: 'Since the camera is broken, would it be possible to exchange it for a new one instead?',
        ko: '카메라가 고장 났으니, 대신에 새 제품으로 교환하는 것이 가능할까요?'
      },
      {
        en: 'If not, would it be possible to reschedule our meeting to next Monday instead?',
        ko: '그렇지 않다면, 대신에 저희 미팅 일정을 다음 주 월요일로 변경하는 것이 가능할까요?'
      }
    ]
  },
  {
    id: 'p_roleplay_3',
    categoryId: 'roleplay',
    pattern: 'I am terribly sorry for the inconvenience, but I have no choice but to [action].',
    meaning: '불편을 드려 대단히 죄송하지만, 저는 [동사원형]할 수밖에 없는 상황입니다.',
    explanation: '약속을 취소하거나 거절해야 하는 난감한 상황극에서 격식 있고 진정성 있게 해명할 때 유용합니다.',
    tip: 'have no choice but to (동사원형) : ~할 수밖에 없다 (매우 고급 표현)',
    examples: [
      {
        en: 'I am terribly sorry for the inconvenience, but I have no choice but to cancel my reservation.',
        ko: '불편을 드려 정말 죄송하지만, 제가 예약을 취소할 수밖에 없는 상황입니다.'
      },
      {
        en: 'I am terribly sorry for the inconvenience, but I have no choice but to ask for a full refund.',
        ko: '불편을 끼쳐드려 대단히 죄송하나, 제가 전액 환불을 요청할 수밖에 없습니다.'
      }
    ]
  }
];

export const OPIC_FILLERS = [
  {
    id: 'f_you_know',
    word: 'You know',
    meaning: '있잖아, 아시다시피',
    situation: '할 말이 즉각 떠오르지 않을 때 문장 중간이나 처음에 자연스러운 공백을 메우기 위해 씁니다.',
    level: 'Essential',
    audioText: 'Well, you know, it was one of the most interesting movies I have ever seen.'
  },
  {
    id: 'f_well',
    word: 'Well...',
    meaning: '글쎄요, 저기',
    situation: '질문을 처음 받았을 때, 생각할 시간을 2~3초 벌며 자연스럽게 서두를 시작할 때 씁니다.',
    level: 'Essential',
    audioText: "Well, that's a tough question. Let me think about it for a second."
  },
  {
    id: 'f_i_mean',
    word: 'I mean...',
    meaning: '제 말은요, 그러니까',
    situation: '본인이 바로 전에 한 표현을 바로잡거나, 더 구체적이고 쉬운 표현으로 풀어서 부연 설명할 때 요긴합니다.',
    level: 'Intermediate',
    audioText: "It was really expensive. I mean, it cost me almost a hundred dollars."
  },
  {
    id: 'f_how_should_i_put_this',
    word: 'How should I put this...',
    meaning: '이걸 어떻게 표현해야 할까요...',
    situation: '적절한 영단어나 까다로운 시제가 기억나지 않을 때 정적(Silence)을 깨고 유창함을 유지하는 강력한 문장입니다.',
    level: 'Advanced (AL Hunter)',
    audioText: 'The atmosphere of the bar was, how should I put this, extremely cozy and chill.'
  },
  {
    id: 'f_let_me_see',
    word: 'Let me see / Let me think...',
    meaning: '어디 보자, 음 생각해보니',
    situation: '과거의 디테일한 에피소드나 특정 연도를 떠올리는 척 연기하며 자연스럽게 숨을 고를 때 사용합니다.',
    level: 'Essential',
    audioText: 'Let me see, I think it was back in the summer of 2024.'
  },
  {
    id: 'f_what_i_am_trying_to_say',
    word: "What I'm trying to say is...",
    meaning: '제가 말씀드리려는 핵심은...',
    situation: '두서없이 이야기를 길게 늘어놓았을 때, 마지막에 결론을 깔끔하고 정돈되게 강조하며 매듭지을 때 탁월합니다.',
    level: 'Advanced (AL Hunter)',
    audioText: "What I'm trying to say is, it was an unforgettable learning experience for me."
  }
];

export const OPIC_TEMPLATES = [
  {
    type: 'Description (묘사)',
    title: '장소 및 사물 묘사 만능 프레임',
    structure: [
      { step: '1. 도입', phrase: 'If I describe this [place/thing] in one word, it would be [adjective].', explanation: '한 단어로 요약해 이 대상을 강하게 규정하며 호기심 자극' },
      { step: '2. 시각/특징', phrase: 'First off, it is heavily characterized by [visual / main feature].', explanation: '가장 돋보이는 외관적, 구조적 주요 특징 서술' },
      { step: '3. 정서/체험', phrase: 'What I appreciate most about it is the cozy vibe it gives off.', explanation: '그 공간에서 느끼는 본인의 정서와 유용한 만족감 연결' },
      { step: '4. 결론', phrase: 'Overall, it occupies a very special place in my daily life.', explanation: '나의 일상에서 차지하는 높은 가치를 칭송하며 맺음' }
    ]
  },
  {
    type: 'Experience (과거 경험)',
    title: '과거 돌발 사건 & 감정 극대화 서사 구조',
    structure: [
      { step: '1. 시작', phrase: 'I still vividly remember a time when [event] happened.', explanation: '마치 엊그제 일처럼 생생하게 기억나는 사건을 던지며 주목' },
      { step: '2. 전개', phrase: 'Everything was going smoothly until out of nowhere, [problem] hit me.', explanation: '평화롭던 흐름 속 예상치 못한 문제(반전)를 드라마틱하게 전개' },
      { step: '3. 클라이맥스', phrase: 'I was totally panicked and honestly, I did not know what to do.', explanation: '당시 느꼈던 멘붕 상태와 막막한 감정을 극대화하여 연기' },
      { step: '4. 해결 & 교훈', phrase: 'Fortunately, I managed to solve it by [action]. Since then, I learned a huge lesson.', explanation: '기적적인 대처 및 해결 과정과 이로 인해 깨달은 깊은 교훈으로 영리하게 끝냄' }
    ]
  }
];
