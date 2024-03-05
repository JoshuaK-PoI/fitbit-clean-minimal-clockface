registerSettingsPage(({ settings }) => (
  <Page>
    <Section
      title={
        <Text bold align="center">
          App Settings
        </Text>
      }
    >
      <Text>
        This is a settings page for the app. You can change the settings here.
      </Text>
      <Toggle settingsKey="toggle" label="Toggle Switch" />
      <Slider
        settingsKey="slider"
        label="Slider"
        min="0"
        max="100"
        step="1"
      />
      <Select
        settingsKey="dateFormat"
        label="Date Format"
        options={[
          { name: "Short", value: 0 },
          { name: "Long", value: 1 }
        ]}
      />
    </Section>
  </Page>
));
