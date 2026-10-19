// 전공 / 평가 항목 / 추천 아티스트 설정 (모든 페이지가 이 파일을 함께 사용)

export const MAJORS = ['보컬', '드럼', '베이스', '기타', '피아노', '작곡', '싱송', '미디'];

const VOCAL_MAJORS = ['보컬', '싱송'];

// key는 DB에 저장되는 점수 키입니다. 저장된 데이터와 맞물려 있으므로 key를 바꾸거나 재사용하지 마세요.
// 항목 구성을 바꿀 때는 새 key를 쓰고, 기존 항목 세트는 LEGACY_FIELDS로 옮겨 예전 리포트가 그대로 보이게 하세요.
const FIELDS = {
    vocal: [
        { key: 'tone', label: '톤' },
        { key: 'pitch_rhythm', label: '음정/박자' },
        { key: 'technique', label: '테크닉' },
        { key: 'instrument', label: '악기능력' },
        { key: 'reading', label: '악보리딩' },
        { key: 'knowledge', label: '사전지식(나이고려)' },
        { key: 'theory', label: '이론' },
        { key: 'attitude', label: '의지/적극성' }
    ],
    instrument: [
        { key: 'tone', label: '터치/톤' },
        { key: 'technique', label: '테크닉' },
        { key: 'groove', label: '박자/그루브' },
        { key: 'genre', label: '장르이해' },
        { key: 'reading', label: '악보리딩' },
        { key: 'knowledge', label: '사전지식(나이고려)' },
        { key: 'theory', label: '이론' },
        { key: 'attitude', label: '의지/적극성' }
    ]
};

// 2026-10 항목 개편 이전에 저장된 리포트의 평가 항목 (예전 리포트 조회·수정용)
const LEGACY_FIELDS = {
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

const CURRENT_KEYS = new Set([...FIELDS.vocal, ...FIELDS.instrument].map(f => f.key));

// 저장된 점수(scores)를 넘기면 그 점수가 입력될 당시의 항목 세트를 돌려줌 (예전 키만 있으면 LEGACY_FIELDS).
// 새로 점수를 입력할 때는 scores 없이 호출하세요.
export function getFields(major, scores) {
    const keys = Object.keys(scores ?? {});
    const set = keys.length && !keys.some(k => CURRENT_KEYS.has(k)) ? LEGACY_FIELDS : FIELDS;
    return VOCAL_MAJORS.includes(major) ? set.vocal : set.instrument;
}

// '실용음악과 입시생 필수 뮤지션' 목록 기준 (1차 필수 청취 → 추가로 꼭 들어야 할 뮤지션 → 국내 순)
export const ARTISTS = {
    '보컬': ['Stevie Wonder', 'Aretha Franklin', 'Whitney Houston', 'Donny Hathaway', 'Ella Fitzgerald', "D'Angelo", 'Ray Charles', 'Marvin Gaye', 'Michael Jackson', 'George Michael', 'Mariah Carey', 'Beyoncé', 'Sarah Vaughan', 'Billie Holiday', 'Freddie Mercury', '박효신', '이소라', '김범수', '나얼', '박정현', '이승철', '태연', '샘김'],
    '싱송': ['Joni Mitchell', 'Carole King', 'Stevie Wonder', 'Paul Simon', 'John Mayer', 'Billie Eilish', 'James Taylor', 'Nick Drake', 'Jeff Buckley', 'Norah Jones', 'Alicia Keys', 'Ed Sheeran', '윤상', '유희열', '아이유', '김동률'],
    '드럼': ['Steve Gadd', 'Vinnie Colaiuta', 'Dave Weckl', 'Jeff Porcaro', 'Tony Williams', 'Steve Jordan', 'Buddy Rich', 'Elvin Jones', 'Dennis Chambers', 'Questlove', 'Chris Dave', 'Nate Smith'],
    '베이스': ['James Jamerson', 'Jaco Pastorius', 'Pino Palladino', 'Marcus Miller', 'Anthony Jackson', 'Paul Chambers', 'Larry Graham', 'Rocco Prestia', 'Nathan East', 'Victor Wooten', 'Richard Bona', 'Thundercat'],
    '기타': ['Jimi Hendrix', 'Eric Clapton', 'John Scofield', 'Wes Montgomery', 'Pat Metheny', 'John Mayer', 'Jim Hall', 'George Benson', 'Allan Holdsworth', 'Mike Stern', 'Nile Rodgers', 'Cory Wong', 'Julian Lage'],
    '피아노': ['Bill Evans', 'Oscar Peterson', 'Bud Powell', 'Herbie Hancock', 'Chick Corea', 'McCoy Tyner', 'Thelonious Monk', 'Wynton Kelly', 'Keith Jarrett', 'Brad Mehldau', 'Robert Glasper', 'Hiromi'],
    '작곡': ['Stevie Wonder', 'The Beatles', 'Billy Joel', 'David Foster', 'Quincy Jones', 'Chick Corea', 'Duke Ellington', 'Steely Dan', 'Jacob Collier', 'Ryuichi Sakamoto', 'Max Martin', 'Ludovico Einaudi'],
    '미디': ['Quincy Jones', 'Timbaland', 'Pharrell Williams', 'Dr. Dre', 'Max Martin', 'Finneas', 'J Dilla', 'Kanye West', 'The Neptunes', 'Rick Rubin', 'Metro Boomin', 'Skrillex', 'Nigel Godrich']
};
