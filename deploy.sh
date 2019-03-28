docker build -t grant05/discord-clone-client:latest -t grant05/discord-clone-client:$SHA -f ./client/Dockerfile ./client
docker build -t grant05/discord-clone-server:latest -t grant05/discord-clone-server:$SHA -f ./server/Dockerfile ./server
docker build -t grant05/discord-clone-worker:latest -t grant05/discord-clone-worker:$SHA -f ./redis-server/Dockerfile ./redis-server
docker push grant05/discord-clone-client:latest
docker push grant05/discord-clone-server:latest
docker push grant05/discord-clone-worker:latest

docker push grant05/discord-clone-client:$SHA
docker push grant05/discord-clone-server:$SHA
docker push grant05/discord-clone-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=grant05/discord-clone-server:$SHA
kubectl set image deployments/client-deployment client=grant05/discord-clone-client:$SHA
kubectl set image deployments/worker-deployment worker=grant05/discord-clone-worker:$SHA