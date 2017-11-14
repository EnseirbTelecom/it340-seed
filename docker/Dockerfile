FROM ubuntu:artful
MAINTAINER Jean-Rémy Falleri <jr.falleri@gmail.com>

COPY ./ ./

# install latest node
RUN apt-get update -y \
	&& apt-get install curl -y \
	&& curl -o /usr/local/bin/n https://raw.githubusercontent.com/visionmedia/n/master/bin/n \
	&& chmod +x /usr/local/bin/n \
	&& n latest \
	&& npm install \
	&& npm run build

EXPOSE 80 8080

CMD ["npm", "run", "run-docker"]
