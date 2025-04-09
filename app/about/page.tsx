import type { Metadata } from "next"
import { TranslatedText } from "@/components/translated-text"

export const metadata: Metadata = {
  title: "About Us | ShopHub",
  description: "Learn more about ShopHub, our mission, and the team behind our e-commerce platform.",
}

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          <TranslatedText section="about" textKey="title" />
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>
            <TranslatedText section="about" textKey="ourStoryTitle" />
          </h2>
          <p>
            <TranslatedText section="about" textKey="ourStoryContent1" />
          </p>
          <p>
            <TranslatedText section="about" textKey="ourStoryContent2" />
          </p>

          <h2>
            <TranslatedText section="about" textKey="ourMissionTitle" />
          </h2>
          <p>
            <TranslatedText section="about" textKey="ourMissionContent" />
          </p>

          <h2>
            <TranslatedText section="about" textKey="ourTeamTitle" />
          </h2>
          <p>
            <TranslatedText section="about" textKey="ourTeamContent" />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                <TranslatedText section="about" textKey="founderName1" />
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <TranslatedText section="about" textKey="founderTitle1" />
              </p>
              <p>
                <TranslatedText section="about" textKey="founderBio1" />
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                <TranslatedText section="about" textKey="founderName2" />
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <TranslatedText section="about" textKey="founderTitle2" />
              </p>
              <p>
                <TranslatedText section="about" textKey="founderBio2" />
              </p>
            </div>
          </div>

          <h2 className="mt-12">
            <TranslatedText section="about" textKey="storeHoursTitle" />
          </h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-2 font-medium">
                    <TranslatedText section="about" textKey="monday" />
                  </td>
                  <td className="py-2">9:00 AM - 6:00 PM</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">
                    <TranslatedText section="about" textKey="tuesday" />
                  </td>
                  <td className="py-2">9:00 AM - 6:00 PM</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">
                    <TranslatedText section="about" textKey="wednesday" />
                  </td>
                  <td className="py-2">9:00 AM - 6:00 PM</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">
                    <TranslatedText section="about" textKey="thursday" />
                  </td>
                  <td className="py-2">9:00 AM - 6:00 PM</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">
                    <TranslatedText section="about" textKey="friday" />
                  </td>
                  <td className="py-2">9:00 AM - 7:00 PM</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">
                    <TranslatedText section="about" textKey="saturday" />
                  </td>
                  <td className="py-2">10:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">
                    <TranslatedText section="about" textKey="sunday" />
                  </td>
                  <td className="py-2">
                    <TranslatedText section="about" textKey="closed" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
