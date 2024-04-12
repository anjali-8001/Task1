import { useEffect, useState } from "react";
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
  Box,
} from "@mantine/core";

export default function TableSelection() {
  const [selection, setSelection] = useState(["1"]);

  const [data, setData] = useState();

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const getData = async () => {
    fetch("https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    getData();
  }, []);

  const rows =
    data &&
    data.map((item) => {
      const selected = selection.includes(item.id);
      return (
        <Table.Tr key={item.id} className={selected ? "bg-blue-800" : ""}>
          <Table.Td>
            <Checkbox
              checked={selection.includes(item.id)}
              onChange={() => toggleRow(item.id)}
            />
          </Table.Td>
          <Table.Td>
            <Group gap="sm">
              <Avatar size={26} src={item.avatar} radius={26} />
              <Text size="sm" fw={500}>
                {item.name}
              </Text>
            </Group>
          </Table.Td>
          <Table.Td>{item.email}</Table.Td>
          <Table.Td>{item.job}</Table.Td>
        </Table.Tr>
      );
    });

  return (
    data && (
      <Box mx={200} my={50}>
        <ScrollArea>
          <Table miw={800} verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: rem(40) }}>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={
                      selection.length > 0 && selection.length !== data.length
                    }
                  />
                </Table.Th>
                <Table.Th>User</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Job</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Box>
    )
  );
}
