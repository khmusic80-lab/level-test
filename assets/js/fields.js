// 전공 / 평가 항목 / 추천 아티스트 설정 (모든 페이지가 이 파일을 함께 사용)

export const MAJORS = ['보컬', '드럼', '베이스', '기타', '피아노', '작곡', '싱송', '미디'];

const VOCAL_MAJORS = ['보컬', '싱송'];

// key는 DB에 저장되는 점수 키입니다. 기존 데이터와 맞물려 있으므로 key를 바꾸거나 재배치하지 마세요.
// 항목을 추가할 때는 끝에 새 key로 붙이세요.
const FIELDS = {
    vocal: [
        { key: 'a', label: '이론' },
        { key: 'b', label: '시창' },
        { key: 'c', label: '음감' },
        { key: 'd', label: '리듬감' },
        { key: 'e', label: '발음' },
        { key: 'f', label: '악기능력' },
        { key: 'g', label: '장르 이해' },
        { key: 'h', label: '나이' },
        { key: 'i', label: '톤' }
    ],
    instrument: [
        { key: 'a', label: '이론' },
        { key: 'b', label: '초견능력' },
        { key: 'c', label: '리듬감' },
        { key: 'd', label: '음감' },
        { key: 'e', label: '테크닉' },
        { key: 'f', label: '나이' },
        { key: 'g', label: '장르 이해' },
        { key: 'h', label: '터치/톤' }
    ]
};

export function getFields(major) {
    return VOCAL_MAJORS.includes(major) ? FIELDS.vocal : FIELDS.instrument;
}

export const ARTISTS = {
    '보컬': ['Beyoncé', 'Adele', 'Bruno Mars', 'Demi Lovato', 'Michael Bublé', 'Ariana Grande', 'Tori Kelly', 'Jacob Collier', 'John Legend', 'Jamie Cullum', 'Charlie Puth', 'Justin Bieber', 'Justin Timberlake', '박효신', '김범수', '나얼', '박정현', '이소라', '성시경', '정승환', '김동률', '미노이'],
    '싱송': ['Ed Sheeran', 'John Mayer', '선우정아', '윤종신', '유재하', '유희열', '윤상', '안예은', '윤딴딴', '이무진', '볼빨간사춘기', '아이유', 'DEAN', '이적', '장필순'],
    '드럼': ['Steve Gadd', 'Dave Weckl', 'Kaz Rodriguez', 'Aaron Spears', 'Robert "Sput" Searight', '김승호', '은아경', '조찬우'],
    '베이스': ['Jaco Pastorius', 'Michael League', 'Marcus Miller', 'Nathan East', 'Richard Bona', 'Esperanza Spalding', '구본암', '로비크', '최인성'],
    '기타': ['Mark Lettieri', 'Pat Metheny', 'Norman Brown', 'John Mayer', 'Michael Landau', 'Scott Henderson', 'Chuck Loeb', 'Paul Jackson Jr.', '적재'],
    '피아노': ['Oscar Peterson', 'Chick Corea', 'Keith Jarrett', 'Cory Henry', 'Herbie Hancock', 'Bill Evans', '송영주', '윤석철', '김요한'],
    '작곡': ['Quincy Jones', 'David Foster', 'John Williams', 'Hans Zimmer', 'Ennio Morricone', 'Ryuichi Sakamoto', 'Howard Shore', '정재일', '모그'],
    '미디': ['Avicii', 'Martin Garrix', 'Alan Walker', 'Zedd', 'Third Party', 'KSHMR', 'David Guetta', 'The Chainsmokers', 'Skrillex', 'Marshmello', 'Steve Aoki', 'Kygo', 'Mike Perry', 'Pdogg']
};
