import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/atoms/Button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with multiple variants and compound components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
  args: {
    variant: 'default',
    padding: 'md',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <CardContent>
        <p>This is a default card with standard padding and shadow.</p>
      </CardContent>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <CardContent>
        <p>This card has a stronger shadow for more prominence.</p>
      </CardContent>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <CardContent>
        <p>This card has a border instead of shadow.</p>
      </CardContent>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>
            This is a description for the card content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here. You can add any content you want.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Product Card</CardTitle>
          <CardDescription>
            A sample product with actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This product is amazing and you should buy it!</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Add to Cart</Button>
        </CardFooter>
      </>
    ),
  },
};

export const CompleteCard: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Premium Headphones</CardTitle>
          <CardDescription>
            Wireless noise-cancelling headphones with premium sound quality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">$299.99</span>
              <span className="text-sm text-text-secondary line-through">$399.99</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-warning">★</span>
                ))}
              </div>
              <span className="text-sm text-text-secondary">(1,247 reviews)</span>
            </div>
            <p className="text-sm text-text-secondary">
              Experience crystal-clear audio with our advanced noise cancellation technology.
              Perfect for music lovers and professionals alike.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1">Add to Wishlist</Button>
          <Button className="flex-1">Add to Cart</Button>
        </CardFooter>
      </>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div className="p-6 bg-gradient-to-r from-primary to-primary-hover text-text-inverted rounded-lg">
        <h3 className="text-xl font-bold mb-2">Custom Content</h3>
        <p>This card has no default padding, allowing for custom layouts.</p>
      </div>
    ),
  },
};
