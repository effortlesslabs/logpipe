"use client";

import { useQuery } from "@apollo/client";
import { GET_SPACES } from "@/graphql/space";
import { Space as ISpace } from "@/types/space";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

function SideBarOptions() {
  const { data, loading, error } = useQuery(GET_SPACES);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Spaces</AccordionTrigger>
        <AccordionContent>
          {!loading &&
            data?.spaces.map((space: ISpace) => (
              <Button
                variant="ghost"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  // TODO: create an implementation of button color according to the selected space name
                  space.name
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                  "w-full justify-start p-0"
                )}
                key={space.id}
                value={space.id}
              >
                {space.name}
              </Button>
            ))}
          {error && <p>{error.message}</p>}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Level</AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SideBarOptions;
