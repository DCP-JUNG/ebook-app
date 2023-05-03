import StoryImagePromptData from "./StoryImagePrompt";

export default interface StoryData {
    id: string;
    title: string;
    body: string;
    imageStoryPrompts: StoryImagePromptData[];
    createdAt: Date;
};