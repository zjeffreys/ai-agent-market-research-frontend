COMPOSE=docker compose -f docker-compose.dev.yml
SERVICE=sgai-web

.PHONY: up down logs test lint

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f

test:
	$(COMPOSE) run --rm $(SERVICE) npm test

lint:
	$(COMPOSE) run --rm $(SERVICE) npm run lint
