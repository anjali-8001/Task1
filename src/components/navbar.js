import Link from "next/link";
import classes from "../styles/navbar.module.css";
import { Group, Container } from "@mantine/core";

const links = [
  { link: "/upload", label: "Upload User" },
  { link: "/", label: "Home" },
];

export default function HeaderMenu() {
  const items = links.map((link) => {
    return (
      <Link key={link.label} className={classes.link} href={link.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          Frontend Assignment
          <Group gap={50} visibleFrom="sm">
            {items}
          </Group>
        </div>
      </Container>
    </header>
  );
}
