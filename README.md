# REST_API
## express JS rest API example
> it contains List of movies 

## make the request using CURL 

#### curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:2000/movies/list-movies

> [{"id":101,"name":"Fight Club","year":1990,"rating":9.8},
   {"id":102,"name":"Inception","year":2010,"rating":8.8},
   {"id":103,"name":"The Dark Knight","year":2008,"rating":9},
   {"id":104,"name":"12 Angry Man","year":1957,"rating":8.9}]

#### curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET localhost:3000/movies/101





