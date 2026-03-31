import type { SVGProps } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bot,
  Boxes,
  CalendarDays,
  Compass,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  Clock3,
  Cuboid,
  Download,
  FileText,
  Flower2,
  FolderOpen,
  Hammer,
  Leaf,
  Lightbulb,
  Paintbrush,
  PenTool,
  Scissors,
  Search,
  Shirt,
  Sparkles,
  Star,
  UserRound,
  Wrench
} from 'lucide-react';

const mapaIcones = {
  alert: AlertTriangle,
  arrowRight: ArrowRight,
  book: BookOpen,
  bot: Bot,
  blocks: Boxes,
  calendar: CalendarDays,
  compass: Compass,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  circuit: CircuitBoard,
  clock: Clock3,
  cube: Cuboid,
  download: Download,
  file: FileText,
  flower: Flower2,
  folder: FolderOpen,
  hammer: Hammer,
  leaf: Leaf,
  lightbulb: Lightbulb,
  palette: Paintbrush,
  pen: PenTool,
  scissors: Scissors,
  search: Search,
  shirt: Shirt,
  sparkles: Sparkles,
  star: Star,
  user: UserRound,
  wrench: Wrench
} as const;

export type NomeIcone = keyof typeof mapaIcones;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: NomeIcone;
  size?: number | string;
}

export function Icon({ name, ...props }: IconProps) {
  const Icone = mapaIcones[name];
  return <Icone aria-hidden="true" {...props} />;
}
