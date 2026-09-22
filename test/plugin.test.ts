import { expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';

test('the plugin wiring points at files that exist', () => {
  const paths = [...readFileSync('.mcp.json', 'utf8').matchAll(/\$\{CLAUDE_PLUGIN_ROOT\}\/([\w./-]+)/g)].map((m) => m[1]!);
  expect(paths).toEqual(['src/server.ts']);
  for (const p of paths) expect(existsSync(p)).toBe(true);
});

test('manifest names match', () => {
  const plugin = JSON.parse(readFileSync('.claude-plugin/plugin.json', 'utf8'));
  const market = JSON.parse(readFileSync('.claude-plugin/marketplace.json', 'utf8'));
  expect(plugin.name).toBe('stash');
  expect(market.plugins[0].name).toBe('stash');
});
