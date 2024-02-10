import { Container } from "@mui/material"
import "./About.css"

export function About() {
  const skills = [
    { name: "React", color: "blue", level: 10 },
    { name: "TypeScript", color: "green", level: 8 },
    { name: "Node.js", color: "yellow", level: 6 },
    { name: "Docker", color: "red", level: 4 },
  ]
  return (
    <div className="about">
      <img
        src="https://via.placeholder.com/150"
        alt="Vitalii Malozemov"
        className="avatar"
      />
      <div className="data">
        <h1>Vitalii Malozemov</h1>
        <p>
          We are a group of developers who love to create and share our
          knowledge with the world. We are passionate about learning and
          teaching others. We are always looking for new ways to improve our
          skills and help others improve theirs.
        </p>
        <div className="skill-list">
          {skills.map((skill, index) => (
            <Skill
              key={index}
              name={skill.name}
              color={skill.color}
              level={skill.level}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Skill({
  name,
  color,
  level,
}: {
  name: string
  color: string
  level: number
}) {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>
        {name} {level}
      </span>
    </div>
  )
}
