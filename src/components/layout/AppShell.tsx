/* // src/components/layout/AppShell.tsx
type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  // Keep this simple so we don't create another <main>
  return <>{children}</>;
}
 */

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  return <>{children}</>;
}
