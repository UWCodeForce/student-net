# Student Net

Some description goes here.

## Setup

### Prerequisites

**Note**: You can skip any of these prerequisites if you have them installed already.

#### Git

Follow the instructions on [Git docs](https://git-scm.com/downloads) to download and install `git` for your system.

#### Docker

Follow the instructions on the [Docker Engine docs page](https://docs.docker.com/engine/install/) to download and install `Docker` for your system (i.e. Windows, Mac, etc).

To check you've set it up correctly, run `docker --version` and it should be one of the later versions, i.e. `^20.10`.

**Note**: You don't really need to fiddle much with Docker for this project since it is mostly just a tool that helps you set up a development environment. Although, Docker is required for Docker Compose to work and that's something you'll use in this project.

Useful docker commands are available at the [`docker` CLI docs](https://docs.docker.com/engine/reference/commandline/cli/).

#### Docker Compose

Once you have Docker, follow the instructions on the [Docker Compose docs page](https://docs.docker.com/compose/install/) to download and install `Docker Compose` for your system.

To check you've set it up correctly, run `docker-compose --version` and it should be one of the later versions, i.e. `^1.25`.

**Some important docker-compose commands**

- `docker-compose up -d`: Starts the services (as a *daemon*, aka in the background) described in the `docker-compose.yml` file located in the same directory.
- `docker-compose down`: Stops the services described in the `docker-compose.yml` file located in the same directory.
- `docker-compose ps`: Lists the services that exist currently. Note that it shows all services regardless of whether it is dead or alive.
- `docker-compose logs -f --tail 10 <service>`: Streams the 10 recent-most lines of logs of a particular service. This is very helpful for debugging when some of your services die (terminate) unexpectedly. Note that if you `<Ctrl-C>` to exit the log stream it will **not** stop the services, rather only the logs.
- `docker-compose restart <service>`: Restart a given service. Helpful if some service just died and you want to try breathing life into it.
- `docker-compose build <service>`: Builds a given service as described by the context Dockerfile from the description of the service in the `docker-compose.yml`

- More commands available in the [`docker-compose` CLI docs](https://docs.docker.com/compose/reference/).

### Student-Net NextJS + MySQL Project (Development Environment)

1. Clone this repository.

  ```sh
  git clone https://github.com/UWCodeForce/student-net.git
  ```

2. Navigate to the directory: `cd student-net`

3. Start the Docker containers

	```sh
	docker-compose up -d
	```
	
4. To **view the site** in the development mode, **navigate to `http://localhost:3000` **from a browser.

5. Try changing some of the HTML/CSS/JS content in `./web/pages/_app.tsx` (or wherever really, as long as it is inside `./web`)  to see live changes on the page.
	
	In fact, any changes you make to the files in `student-net/web/` will automatically trigger a re-render of the page from within your Docker container so you **don't have to start/stop any server or even refresh the page**. Sometimes, it may happen that you break some part of the app and save the file. For example, if you have `<di>Forgot a 'v' in 'div'. Oh no!</div>` in your code it will cause the app to break.
	
	In such a scenario, just **correct the file and reload** the page. This should fix the error and start the live-reloaded page should start working like previously.

	**Note**: When you wish to take a break from working on this project, you **don't have to shut down any servers** either.

	To shut down all the services, just run:
	```sh
	docker-compose down
	```
	This will keep your changes to the files but should you choose to discard them, it is as easy as running `git restore <file>` on files you don't want to keep the changes for. 

6. Don't forget to keep committing your updates as you keep changing/adding new content to this NextJS app.

7. Done! You've successfully set up the development environment for the Student Net project in a few simple steps.

   Now it is time to write some code! :sunglasses:

### Student-Net NextJS + MySQL Project (Production Environment)

To be continued...
