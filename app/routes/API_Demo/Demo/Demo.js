import React, { useState, useEffect } from "react";
import {Container} from './../../../components';

const Demo = () => {
  const [page, setPage] = useState(0);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchData();
  },[]);

  async function fetchData() {
    let url = `/api/stories/get?page=${page}`;
    console.log(`Fetching request with url ${url}`);
    fetch(url).then(async response => {
        console.log(`Received response with status ${response.status}`);
        let data = await response.json();
        console.log(data[0]);
        return data;
    }).then(data => setStories(stories.concat(data)))
      .then(()=> setPage(page+1))
      .catch(err => console.log(err));
  }

  const loadMore = () =>{
      fetchData();
  }

  return (
    <Container>
      <div>API TEST PAGE</div>
      <button onClick={loadMore}>Load More</button>
      <div>
        {stories.map((story, i) => {
          return <p key={i}>{story.id} - {story["story texts"]}</p>;
        })};
      </div>
    </Container>
  );
};

export default Demo;
