import type { Meta, StoryObj } from '@storybook/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <div className="w-[420px]">
      <Accordion type="single" collapsible defaultValue="item-1" className="space-y-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Onesaz UI?</AccordionTrigger>
          <AccordionContent>
            A modern component library built with Radix UI primitives and Tailwind CSS.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I customize styles?</AccordionTrigger>
          <AccordionContent>
            Yes. You can customize via Tailwind classes and theme tokens.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Does it support animations?</AccordionTrigger>
          <AccordionContent>
            Yes. Open/close animations are included by default.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
