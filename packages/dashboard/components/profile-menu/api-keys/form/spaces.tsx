import { ControllerRenderProps } from "react-hook-form";
import { useQuery } from "@apollo/client";
import { GET_SPACES } from "@/graphql/space";
import { Space } from "@/types/space";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type SpacesDropdownProps = {
  field: ControllerRenderProps<
    {
      name: string;
      spaceId: string;
    },
    "spaceId"
  >;

  handleSetValues: (value: string) => void;
};

function SpacesDropdown(props: SpacesDropdownProps) {
  const { data, loading, error } = useQuery(GET_SPACES);

  const selectedSpace: Space | null = data?.spaces.find(
    (item: Space) => item.id === props.field.value
  );

  return (
    <FormItem className="w-1/2">
      <FormLabel>SpaceId</FormLabel>
      <FormControl>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Input
              className="w-96 cursor-pointer"
              placeholder="Select Space"
              {...props.field}
              value={selectedSpace?.name || "Select Space"}
              readOnly
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {loading && <DropdownMenuItem>Loading...</DropdownMenuItem>}
            {!loading && error && (
              <DropdownMenuItem>{error.message}</DropdownMenuItem>
            )}
            {!loading &&
              data?.spaces.map((space: Space) => (
                <DropdownMenuItem
                  className="w-96"
                  key={space.id}
                  onClick={() => {
                    props.handleSetValues(space.id);
                  }}
                >
                  {space.name}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </FormControl>
    </FormItem>
  );
}

export default SpacesDropdown;
