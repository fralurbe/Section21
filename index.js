//http://www.omdbapi.com/?apikey=[yourkey]&
const key = "3c4869fc";
console.log('Hi there!');

const fetchData = async () => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params : {
            apikey: '3c4869fc',
            s: 'titanic'
        }
    });
    console.log(response.data);
};

fetchData();

