import React from "react";
import PluginConfig from "../../components/plugin-config/plugin-config";
import Page from "../../components/page/page";
import { getPluginStructures } from "@arithmico/engine";
const pluginStructures = getPluginStructures();

export default function Home() {
  return (
    <Page>
      {pluginStructures.map((pluginStructure) => (
        <PluginConfig
          key={pluginStructure.name}
          name={pluginStructure.name}
          items={pluginStructure.items.map((item) => ({
            name: item.name,
            description: item.description.en,
            synopsis: item.synopsis,
          }))}
        />
      ))}
    </Page>
  );
}
