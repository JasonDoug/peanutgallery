{`Create a Python project for a Vision Agents video AI agent using uv and Python 3.12.

  Steps:
  1. Initialize: uv init && uv add "vision-agents[getstream,gemini,ultralytics]" python-dotenv
  2. Create .env with: STREAM_API_KEY, STREAM_API_SECRET (from getstream.io), GOOGLE_API_KEY (from aistudio.google.com)
  3. Create main.py:

  from dotenv import load_dotenv
  from vision_agents.core import Agent, AgentLauncher, User, Runner
  from vision_agents.plugins import getstream, gemini, ultralytics

  load_dotenv()

  async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="Coach", id="agent"),
        instructions="Analyze what you see on camera and provide real-time feedback on the user's form and technique.",
        llm=gemini.Realtime(fps=3),
        processors=[
            ultralytics.YOLOPoseProcessor(model_path="yolo26n-pose.pt")
        ],
    )

  async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    call = await agent.create_call(call_type, call_id)
    async with agent.join(call):
        await agent.simple_response("Greet the user and let them know you can see them")
        await agent.finish()

  if __name__ == "__main__":
    Runner(AgentLauncher(create_agent=create_agent, join_call=join_call)).cli()

  4. Run with: uv run main.py run

  Reference docs: https://visionagents.ai
  MCP server: https://visionagents.ai/mcp
  Skill.md: https://visionagents.ai/skill.md`}
