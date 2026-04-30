# Tmux Development Session

**All development services must be started and stopped within a Tmux session named `ai-app-starter`.**

## Rules

- Before starting services, check if the `ai-app-starter` session exists via `tmux ls`. If it does not exist, create it first with `tmux new-session -d -s ai-app-starter`
- Start `pnpm dev`, `pnpm dev:frontend`, `pnpm start`, and other development services inside the `ai-app-starter` session
- To stop services, send an interrupt signal with `tmux send-keys -t ai-app-starter C-c`, or kill the entire session with `tmux kill-session -t ai-app-starter`
- To view service logs, use `tmux capture-pane -t ai-app-starter -p` or attach directly with `tmux attach -t ai-app-starter`
- **Do not** run development service commands directly in the current shell; they must be managed through the Tmux session
