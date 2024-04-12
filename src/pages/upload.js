import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "react-hot-toast";

export default function Form() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        "https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            avatar: values.avatar,
            job: values.job,
          }),
        }
      );
      toast.success("User created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Box maw={340} mx="auto" mt={50}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          mt="md"
        />

        <TextInput
          withAsterisk
          label="Avatar"
          placeholder="Your Avatar Link"
          mt="md"
          {...form.getInputProps("avatar")}
        />
        <TextInput
          withAsterisk
          label="Job"
          placeholder="Your Job Position"
          mt="md"
          {...form.getInputProps("job")}
        />
        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
