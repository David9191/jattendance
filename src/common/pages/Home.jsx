import React from 'react';
import { getRandomVerse } from '../data/bibleVerses';
import { Link } from 'react-router-dom';

const Home = () => {
  const { verse, book, chapter, verseNumber, version } = getRandomVerse();

  return (
    <>
      <div className="bible-verse">
        <h1>샬롬!</h1>
        <p>To. 사랑하는 하나님의 자녀</p>
        <div>
          <p>{verse}</p>
          <div>
            <p>
              {book} {chapter}:{verseNumber} - {version}
            </p>
          </div>
        </div>
      </div>
      <div className="move-to-where">
        {/* session이 없으면 아래 2개, 있으면 출석체크 */}
        <Link to={'/signup'}>회원가입</Link>
        <Link to={'/signin'}>로그인</Link>
        <Link to={'/signin'}>출석체크</Link>
      </div>
    </>
  );
};

export default Home;
