import React, { useState } from 'react';
import './App.css';

//하나의 type 을 만듦 (전체를 관리할 수 있도록)
interface Post{
  id : number;
  title : string;
  content : string;
  date : string;
}

const App : React.FC = () => {
//필요에 따른 자바스크립트 코드 작성 
  let title : string = 'My Blog' ;
  let [post, setPost] = useState<Post[]>([
    {id : 1, title : '인생은 지름길이 없다', content : '끈질긴 놈이 이긴다', date : '2024년 5월 17일'}, 
    {id : 1, title : '아주 작은 습관의 힘', content : '좋은 습관은 작은 것 부터 시작된다', date :'2024년 5월 17일'}, 
    {id : 1, title : '미움받을 용기', content : '모든 고민은 인간관계에서 비롯된다', date : '2024년 5월 17일'} ]); 

  let [like, setLike] = useState<number[]>([0,0,0]);

  const[detail, setDetail] = useState<boolean>(false); 

  let [index, setIndex] = useState<number>(0);

  let [input, setInput] = useState<string>(''); 

  const handlelikeClick = (postIndex : number) : void =>{
    let cplike = [...like];
    cplike[postIndex] = cplike[postIndex]+1 ;
    setLike(cplike);
  }

  const handleDetailClick = (idx : number) : void =>{
    detail == true ? setDetail(false) : setDetail(true);
    setIndex(idx); 
  }

  const handleAddClick = () : void =>{
    const newPost : Post = {
      id : post.length + 1,   //post의 길이는 점점 늘어날 것이기 때문에 
      title : input,
      content : "New Content",
      date : new Date().toLocaleDateString(),   //오늘의 날짜 전달가능
    };

    setPost((prevPosts)=>[...prevPosts, newPost])   //이전의 포스트를 해체하고 새로운 포스트데이터를 끼워넣는 것
  }

  const handleDeleteClick = (idx : number) : void =>{
    let cppost = [...post];
    cppost.splice(idx, 1);
    setPost(cppost); //삭제한 것만 제외하고 업데이트 되서 출력이 될 것임
  }

  let arr = [0,1,2];
  let newArr = arr.map(function(param) {
    return param+10;
  })

  console.log(newArr);

  var arr2 = [];
  for (var i=0; i<3; i++) {
    arr2.push(<div>제목</div>);
  }



  return (
    <div className = 'App'>
        <div className='title-nav'>
          <h1>{title}</h1>
        </div>

        <div className='container'>
          <div className='board'>
            <input type='text' onChange={
              (e)=> {
                console.log(e.target.value)
                setInput(e.target.value);   //input이라는 값에 e.target.value가 들어간다는 의미
              }
            }></input>

            <button onClick={()=>{handleAddClick()}}>추가</button>
          </div>
          </div> 

          <div className='container'>
          <div className='board'>
            {
              post.map(function(param : Post, idx) {
                console.log(idx);
                return (
                  <div className='post'key = {idx}>
                    <h3 onClick = {()=>handleDetailClick(idx)}>{post[idx].title}
                    <span onClick = {(e)=> {
                      handlelikeClick(idx)
                      e.stopPropagation();
                      }}>💚</span>{like[idx]}</h3>
                    <p>{post[idx].date}</p>
                    <button className = 'delbutton' onClick={()=>handleDeleteClick(idx)}>삭제</button>
                  </div>
                )
              })
            }

          </div>  
        </div>

        {/*동적 UI보이기*/}
        {
          detail == true ? <Detail post = {post} index = {index}></Detail> : null
        }

        {/*<Timer></Timer>*/}
    </div> 
  );
}

interface DetailProps {
  post : Post[]; //Post라는 type이 배열의 형태로 데이터가 여러개 들어온다는 의미
  index : number;
}
//상세보기 컴포넌트가 만들어진 것, Detail의 타입은 React.FC로 사용하면 됌
const Detail : React.FC <DetailProps> = ({post, index}) => {
  return (
    <div className='detail'>
      <h3>{post[index].title}</h3>
      <h4>{post[index].content}</h4>
      <p>{post[index].date}</p>
    </div>
  )
}

/*const Timer : React.FC = () => {
  const [time,setTime] = useState<number>(0);

  return (
    <div>
      <h2>타이머 : {time} 초</h2>
      <button onClick={
        function() {
          setInterval(()=>{
            setTime((time)=> time+1);
          }, 1000);
        }
      }>시작</button>
    </div>
  )
}*/

export default App;