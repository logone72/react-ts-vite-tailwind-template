import { createFileRoute } from '@tanstack/react-router';

import Home from '@/pages/home/ui/Layout';

export const Route = createFileRoute('/')({
  component: Home,
});
