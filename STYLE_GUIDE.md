# Style Guide

This guide exists to ensure uniformity of code across contributors.
It is based on the [Rust style guide],
but this document should take precedence in the event of divergence.
If this document is missing a rule, defer to the Rust style guide.
(Any missing rules can be reported by creating an issue with the `styleguide` label.)


## Global Formatting Conventions

### Indentation and Line Length

- Use spaces, not tabs
- Each level of indentation must be 4 spaces
    (that is, all indentation outside of string literals and comments must be a multiple of four).
- The absolute **maximum line length is 100** characters, however a lower limit of
    **90 characters should be preferred** if it does not harm readability.


### Line Breaks

Committed files must use line-feed (`\n`) as line breaks, with no carriage-return (`\r`).


## Markdown Formatting Conventions

### Line Length

A newline to prevent a line becoming too long must never be placed in the middle of a word.


### Style markers

- To mark a word or phrase as italic, underscores should be used, as in `_foo_` for _foo_.
- To mark a word or phrase as bold, double asterisk should be used, as in `**bar**` for **bar**.
- To mark a word as bold-italic, a single underscore and double asterisk should be used,
    as in `_**baz**_` for _**baz**_



## Rust Formatting Conventions

### Blank lines

- Statements should be separated by either zero or one blank linkes (i.e., one or two newlines).
- Module-level/global items should be separated by either zero, one, or two blank lines
    (i.e., one, two, or three newlines)

For example,
```rust
fn foo() {
    let x = ...;

    let y = ...;
    let z = ...;
}

fn bar() {
    ...
}


fn baz() {}
fn grok() {}
```


### Module-Level Items

`extern crate` statements, if present, must be first in a file.
They must be ordered alphabetically.

Module declarations (`mod foo;`, not `mod { ... }`) should then follow.
These must be ordered alphabetically.

`use` statements should follow module declarations, grouped into the below categories.
Within each category, imports must be ordered alphabetically.
Each group should be separated by a blank line.
- Standard library modules
- Other external modules
- Local modules

Imports of local modules must be ordered alphabetically,
with the exception that imports from the `self` crate must appear last,
and imports from the `super` crate before those from `self`.

Module declarations annotated with `#[macro_use]`
should be in the correct order as described above,
unless that would break the semantics of the declaration.

#### Function Definitions

In Rust, functions are found by searching for `fn [function_name]`;
it is therefore important that code is styled so as to be searchable in this way.

The proper ordering and spacing is as follows:
```rust
[pub] [unsafe] [extern ["ABI"]] fn foo(arg1: i32, arg2: i32) -> i32 {
    ...
}
```

Comments should be avoided within the signature.

If the function signature does not fit on one line,
then break after the opening parenthesis and before the closing parenthesis,
and put each argument on its own block-indented line.
For example,

```rust
fn foo(
    arg1: i32,
    arg2: i32,
    arg3: i32,
    arg4: i32,
    arg5: i32,
    arg6: i32,
    arg7: i32,
    arg8: i32,
) -> i32 {
    ...
}
```

Note that the last argument here retains a trailing comma.

#### Tuples and Tuple Structs

Write the type list exactly as you would a parameter list to a function.

Build a tuple or tuple list as you would call a function.

For example,
```rust
struct Foo(Type1, Type2);

struct Bar(
    Type1,
    Type2,
    Type3,
    Type4,
    Type5,
    Type6,
    Type7,
    Type8,
);

let x = Foo(11, 22);
let y = Bar(11, 22, 33, 44, 55, 66, 77, 88);
let z = (11, 22, 33);
```

#### Enums

In the declaration, put each variant on its own line, block indented.

Format each variant accordingly as either a struct, tuple struct, or identifier,
which doesn't require special formatting (but without the `struct` keyword).

```rust
enum Foo {
    First,
    Second(u32),
    Error {
        err: Box<Error>,
        line: u32,
    },
}
```

If a struct variant is [_small_](#small-items), it may be formatted on one line.
In this case, do not use a trailing comma for the field list,
but do put spaces around each brace:

```rust
enum Bar {
    Error { err: Box<Error>, line: u32 }
}
```

In an enum with multiple struct variants, if any struct is written on multiple lines,
then the multi-line formatting should be used for all struct variants.
However, such a situation might be an indication that the fields of the variant should
be factored out into their own struct.

#### Structs and Unions

Struct names follow on the same line as the `struct` keyword,
with the opening brace on the same line when it fits within the right margin.
All struct fields are indented once and end with a trailing comma.
The closing brace is not indented and appears on its own line.

```rust
struct Foo {
    a: A,
    b: B,
}
```

If and only if the type of a field does not fit within the right margin,
it is pulled down to its own line and indented again.

```rust
struct Foo {
    a: A,
    this_is_a_very_long_name:
        ThisIsAVeryLongName,
}
```

A unit struct (e.g., `struct Foo;`) must be used where possible instread of an empty struct
(e.g., `struct Foo();` or `struct Foo {}`).

These same guidelines apply to untagged union declarations.

#### Tuple Structs

Put the whole struct on one line if possible.
Types in the parentheses should be separated by a comma and a space with no trailing comma.
No spaces should be placed around the parentheses or semicolon@

```rust
pub struct Foo(String, u8);
```

For more than a few fields, a proper struct with named fields should be used.
Given this, a tuple struct should always fit on one line.
If it does not, block format the fields with one field on each line and a trailing comma.

```rust
pub struct Foo(
    String,
    u8,
);
```


#### Traits

Trait items should be block-indented.
If there are no items, the trait should be formatted on a single line.
Otherwise, there should be line-breaks after the opening brace and before the closing brace.

```rust
trait Foo {}

pub trait Bar {
    ...
}
```

If the trait has bounds, there should be a space after the colon, but not befer,
and after each `+`, e.g.,

```rust
trait Foo: Debug + Bar {}
```

Prefer not to line-break in the bounds if possible
(consider using a `where` clause if this becomes necessary).
Prefer to break between bounds than to break any individual bound.
If you must break the bounds, put each bound (including the first) on its own block indented line,
break before the `+`, and put the opening brace on its own line.
In this case, each `+` should be proceeded only by the indentation and not the usual space:

```rust
pub trait IndexRanges:
    Index<Range<usize>, Output=Self>
    + Index<RangeTo<usize>, Output=Self>
    + Index<RangeFrom<usize>, Output=Self>
    + Index<RangeFull, Output=Self>
{
    ...
}
```


#### Implementations

`impl` items should be block indented.
If there are no items, the `impl` should be formatted on a single line.
Otherwise, there should be line-breaks after the opening brace and before the closing brace.

```rust
impl Foo {}

impl Bar for Foo {
    ...
}
```

Avoid line-breaking in the signature if possible.
If a line-break is required in a non-inherent `impl`, break immediately before `for`,
block indent the concrete type, and put the opening brace on its own line:

```rust
impl Bar
    for Foo
{
    ...
}
```

#### Extern Crate
Use spaces around keywords, no spaces around the semicolon.

```rust
extern crate foo;
```

#### Modules

Use spaces around keywords and before the opening brace, no spaces around the semicolon.
An empty module should be placed on one line.

```rust
mod foo;

mod bar {}

mod baz {
    fn spam(x: i32) -> i32 {
        ...
    }
}
```

#### `macro_rules!`

Use `{}` for the full definition of the macro.
An empty macro should be placed on one line.

```rust
macro_rules! foo {}

macro_rules! bar {
    ...
}
```

#### Generics

Prefer to put a generics clause on one line.
Break other parts of an item declaration rather than line-breaking a generics clause.
If a generics clause is large enough to require line-breaking,
you should prefer to use a `where` clause instead.

Do not put spaces before or after `<` nor before `>`.
Only put a space after `>` if it is followed by a word or opening brace,
not an opening parenthesis.
There should be a space after each comma and no trailing comma.

```rust
fn foo<T: Display, U: Debug>(x: Vec<T>, y: Vec<U>) ...

impl<T: Display, U: Debug> SomeType<T, U> {
    ...
}
```

If the generics clause must be formatted across multiple lines,
each parameter should have its own block-indented line,
there should be newlines after the opening bracket and before the closing bracket,
and there should be a trailing comma.

```rust
fn foo<
    T: Display,
    U: Debug,
>(x: Vec<T>, y: Vec<U>) ...
```

If an associated type is bound in a generic type, then there 



## _Small_ Items

In many places in this guide, we specify that a formatter may format an item
differently if it is _small_, for example, Rust struct literals:

```rust
// Normal formatting
Foo {
    f1: an_expression,
    f2: another_expression(),
}

// _small_ formatting
Foo { f1, f2 }
```

An item counts as small if any of the following conditions apply:
- A struct or struct tuple has only a few fields, each of which has only simple types
    (i.e., no inline structs)
- An enum has one field


[Rust Style Guide]: https://github.com/rust-lang/fmt-rfcs/blob/master/guide/guide.md
