import { CheckCircle, Lock } from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import classNames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { title, slug, availableAt, type } = props;
  const { slug: lesson } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const isActiveLesson = lesson === slug;

  const availableDateFormatted = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    { locale: ptBR }
  );

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>
      <div
        className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-600",
          {
            "bg-green-600": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames(
                "text-sm font-medium text-blue-500 flex items-center gap-2",
                { "text-white": isActiveLesson }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm font-medium text-orange-500 flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className="text-xs text-white px-2 py=[2px] rounded border font-bold">
            {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong
          className={classNames("text-gray-200 mt-4 block", {
            "text-white": isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}
