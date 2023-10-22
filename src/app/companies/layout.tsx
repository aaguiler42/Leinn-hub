import CenteredLayout from "@/layouts/CenteredLayout";

export default function Layout ({ children }: {
    children: React.ReactNode;
  }) {
    return (<CenteredLayout>{children}</CenteredLayout>)
}