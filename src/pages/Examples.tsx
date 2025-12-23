import CodeBlock from '../components/CodeBlock';

export default function Examples() {
  return (
        <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-8 hover:shadow-blue-500/20 transition-all duration-500">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">Real-World Examples</h1>
        <p className="text-gray-300 mb-8">
          Practical TypeScript examples that you'll use in everyday development.
        </p>

        <div className="space-y-8">
          {/* API Request Example */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">API Request Handling</h2>
            <CodeBlock title="Fetching and Typing API Data">
{`interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchUser(userId: number): Promise<User> {
  const response = await fetch(\`/api/users/\${userId}\`);
  const result: ApiResponse<User> = await response.json();
  
  if (result.status !== 200) {
    throw new Error(result.message);
  }
  
  return result.data;
}

// Usage
const user = await fetchUser(1);
console.log(user.name); // Type-safe access`}
            </CodeBlock>
          </div>

          {/* React Component Example */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">React Component with TypeScript</h2>
            <CodeBlock title="Typed Props and State">
{`interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: () => void;
}

export function Button({ 
  label, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  onClick 
}: ButtonProps) {
  const baseClasses = 'rounded font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Usage
<Button 
  label="Submit" 
  variant="primary" 
  onClick={() => console.log('Clicked!')} 
/>`}
            </CodeBlock>
          </div>

          {/* Form Validation Example */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Form Validation</h2>
            <CodeBlock title="Type-Safe Form Handling">
{`interface FormData {
  username: string;
  email: string;
  password: string;
  age: number;
}

type ValidationErrors = Partial<Record<keyof FormData, string>>;

function validateForm(data: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (data.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (data.age < 18) {
    errors.age = 'Must be 18 or older';
  }

  return errors;
}

// Usage
const formData: FormData = {
  username: 'jo',
  email: 'invalid-email',
  password: '1234',
  age: 16,
};

const errors = validateForm(formData);
// errors: {
//   username: 'Username must be at least 3 characters',
//   email: 'Invalid email format',
//   password: 'Password must be at least 8 characters',
//   age: 'Must be 18 or older'
// }`}
            </CodeBlock>
          </div>

          {/* State Management Example */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">State Management</h2>
            <CodeBlock title="Reducer Pattern with TypeScript">
{`type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_VALUE'; payload: number }
  | { type: 'RESET' };

interface State {
  count: number;
  history: number[];
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1],
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1],
      };
    case 'SET_VALUE':
      return {
        count: action.payload,
        history: [...state.history, action.payload],
      };
    case 'RESET':
      return {
        count: 0,
        history: [0],
      };
    default:
      // TypeScript knows this is unreachable
      const _exhaustive: never = action;
      return state;
  }
}

// Usage in React
const [state, dispatch] = useReducer(reducer, { 
  count: 0, 
  history: [0] 
});

dispatch({ type: 'INCREMENT' });
dispatch({ type: 'SET_VALUE', payload: 42 });`}
            </CodeBlock>
          </div>

          {/* Utility Functions Example */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Utility Functions</h2>
            <CodeBlock title="Generic Helper Functions">
{`// Deep readonly type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};

// Group array items by key
function groupBy<T, K extends keyof T>(
  array: T[], 
  key: K
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const group = String(item[key]);
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// Usage
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
  { id: 2, name: 'Mouse', category: 'Electronics', price: 29 },
  { id: 3, name: 'Desk', category: 'Furniture', price: 299 },
];

const grouped = groupBy(products, 'category');
// {
//   Electronics: [{ id: 1, ... }, { id: 2, ... }],
//   Furniture: [{ id: 3, ... }]
// }`}
            </CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
