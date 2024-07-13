import { CardHeader, CardTitle } from "@ui/components/ui/card";
import { TabsContent } from "@ui/components/ui/tabs";

import { ATHLETE_SETTINGS_TAB } from "@/app/_shared/_constants/athlete-constants";
import ZTabsMenu from "@/app/_shared/_form/z-tabs";
import AthleticFormProvider from "@/app/(athlete)/_lib/components/settings/athletic-form-provider";
import PersonalFormProvider from "@/app/(athlete)/_lib/components/settings/personal-form-provider";
import SettingsFormProvider from "@/app/(athlete)/_lib/components/settings/settings-form-provider";

const ProfilePage = () => {
  return (
    <div className="flex flex-col">
      <CardHeader>
        <CardTitle>Athlete Profile Settings</CardTitle>
      </CardHeader>
      <ZTabsMenu triggers={ATHLETE_SETTINGS_TAB} className="m-2">
        <div className="container mx-auto my-4 max-w-5xl">
          <TabsContent value={ATHLETE_SETTINGS_TAB[0]!.label}>
            <PersonalFormProvider />
          </TabsContent>
          <TabsContent value={ATHLETE_SETTINGS_TAB[1]!.label}>
            <AthleticFormProvider />
          </TabsContent>
          <TabsContent value={ATHLETE_SETTINGS_TAB[2]!.label}>
            <SettingsFormProvider />
          </TabsContent>
        </div>
      </ZTabsMenu>
    </div>
  );
};

export default ProfilePage;
